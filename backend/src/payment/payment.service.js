import { Injectable, Dependencies } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DonationsService } from '../donations/donations.service';

@Injectable()
@Dependencies(PrismaService, DonationsService)
export class PaymentService {
  constructor(prisma, donationsService) {
    this.prisma = prisma;
    this.donationsService = donationsService;
  }

  async createOrder(donorName, email, amount, programId, purpose, paymentMode) {
    const orderId = 'order_' + Date.now();
    await this.prisma.donation.create({
      data: {
        donorName,
        email,
        amount: parseFloat(amount),
        programId,
        purpose,
        paymentMode: paymentMode || 'ONLINE',
        orderId,
        status: 'PENDING',
      }
    });

    return { orderId, amount: parseFloat(amount) };
  }

  async verifyPayment(orderId, paymentId, status) {
    const donation = await this.prisma.donation.findFirst({ where: { orderId } });
    if (!donation) throw new Error('Order not found');

    if (status === 'failed') {
      await this.prisma.donation.update({
        where: { id: donation.id },
        data: { status: 'FAILED' }
      });
      throw new Error('Payment failed');
    }

    if (status === 'success') {
      // Simulate 2 second delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newPaymentId = paymentId || 'pay_' + Math.floor(Math.random() * 1000000);

      // Trigger donation business logic
      const completedDonation = await this.donationsService.processSuccessfulDonation(donation.id, newPaymentId);
      
      return {
        message: "Payment successful",
        receiptId: completedDonation.receiptId
      };
    }
    
    throw new Error('Invalid status');
  }
}
