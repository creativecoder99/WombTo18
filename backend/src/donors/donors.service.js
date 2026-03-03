import { Injectable, Dependencies } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
@Dependencies(PrismaService)
export class DonorsService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getRecentDonors() {
    return this.prisma.donation.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        donorName: true,
        amount: true,
        createdAt: true,
        isLeadingContributor: true
      }
    });
  }

  async getTopDonors() {
    return this.prisma.donor.findMany({
      take: 10,
      orderBy: { totalContributed: 'desc' },
      select: {
        id: true,
        name: true,
        totalContributed: true,
        dashboardAccess: true
      }
    });
  }

  async getDonorDashboard(email) {
    let donor = await this.prisma.donor.findUnique({
      where: { email },
    });

    if (!donor) {
      donor = await this.prisma.donor.create({
        data: { name: email.split('@')[0], email, totalContributed: 0, dashboardAccess: true }
      });
      donor._count = { donations: 0 };
    }

    const donations = await this.prisma.donation.findMany({
      where: { email },
      include: { program: true },
      orderBy: { createdAt: 'desc' }
    });

    if (donor && !donor._count) {
      donor._count = { donations: donations.length };
    }

    return {
      donor,
      donations
    };
  }
}
