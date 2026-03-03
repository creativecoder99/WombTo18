import { Injectable, Dependencies } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

@Injectable()
@Dependencies(PrismaService)
export class DonationsService {
  constructor(prisma) {
    this.prisma = prisma;
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: process.env.SMTP_PORT || 2525,
      auth: {
        user: process.env.SMTP_USER || 'user',
        pass: process.env.SMTP_PASS || 'pass',
      },
    });
  }

  async processSuccessfulDonation(donationId, paymentId) {
    const donation = await this.prisma.donation.findUnique({ where: { id: donationId } });
    if (!donation) throw new Error('Donation not found');

    const { email, amount, programId } = donation;
    
    const program = await this.prisma.program.findUnique({ where: { id: programId } });
    if (!program) throw new Error('Program not found');

    let donor = await this.prisma.donor.findUnique({ where: { email } });
    if (!donor) {
      donor = await this.prisma.donor.create({
        data: { name: donation.donorName, email, totalContributed: 0 }
      });
    }

    const newTotalContributed = donor.totalContributed + amount;
    const contributionPercentage = program.totalRequired > 0 ? (newTotalContributed / program.totalRequired) * 100 : 0;
    const isLeadingContributor = contributionPercentage >= 10;
    const dashboardAccess = newTotalContributed >= 10000;

    await this.prisma.donor.update({
      where: { id: donor.id },
      data: { 
        totalContributed: newTotalContributed,
        dashboardAccess: donor.dashboardAccess || dashboardAccess
      }
    });

    await this.prisma.program.update({
      where: { id: programId },
      data: { totalRaised: program.totalRaised + amount }
    });

    let impact = await this.prisma.impact.findUnique({ where: { id: 1 } });
    if (impact) {
      await this.prisma.impact.update({
        where: { id: 1 },
        data: { totalFundingReceived: impact.totalFundingReceived + amount }
      });
    }

    const year = new Date().getFullYear();
    const randomHex = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0');
    const receiptId = `WTF-${year}-${randomHex}`;

    const updatedDonation = await this.prisma.donation.update({
      where: { id: donationId },
      data: {
        paymentId,
        status: 'SUCCESS',
        receiptId,
        receiptStatus: 'ISSUED',
        contributionPercentage,
        isLeadingContributor
      }
    });

    const pdfPath = await this.generatePDF(updatedDonation, program);
    await this.sendReceiptEmail(updatedDonation, pdfPath);

    return updatedDonation;
  }

  async generatePDF(donation, program) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument();
        const receiptsDir = path.join(process.cwd(), 'receipts');
        if (!fs.existsSync(receiptsDir)) fs.mkdirSync(receiptsDir);
        
        const filePath = path.join(receiptsDir, `${donation.receiptId}.pdf`);
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fontSize(20).text('WombTo18 Foundation', { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text('Donation Receipt', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Receipt ID: ${donation.receiptId}`);
        doc.text(`Date: ${new Date().toLocaleDateString()}`);
        doc.text(`Donor Name: ${donation.donorName}`);
        doc.text(`Email: ${donation.email}`);
        doc.text(`Amount: INR ${donation.amount}`);
        doc.text(`Program: ${program.name}`);
        if(donation.purpose) doc.text(`Purpose: ${donation.purpose}`);
        doc.text(`Payment Mode: ${donation.paymentMode}`);
        doc.moveDown();
        doc.text('Thank you for your generous contribution. This donation is eligible for 80G tax benefits.');
        
        doc.end();
        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
      } catch (err) {
        reject(err);
      }
    });
  }

  async sendReceiptEmail(donation, pdfPath) {
    try {
      let text = `Dear ${donation.donorName},\n\nThank you for your generous donation of INR ${donation.amount}. Please find your receipt attached.`;
      if (donation.isLeadingContributor) {
        text += `\n\nYour immense support makes you a Leading Contributor! Thank you for walking this path with us.`;
      }
      
      await this.transporter.sendMail({
        from: '"WombTo18 Foundation" <no-reply@wombto18.org>',
        to: donation.email,
        subject: `Your Donation Receipt - ${donation.receiptId}`,
        text,
        attachments: [
          {
            filename: `${donation.receiptId}.pdf`,
            path: pdfPath
          }
        ]
      });
    } catch(err) {
      console.error('Email failed to send', err);
    }
  }
}
