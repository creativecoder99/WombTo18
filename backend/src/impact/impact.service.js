import { Injectable, Dependencies } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
@Dependencies(PrismaService)
export class ImpactService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getImpact() {
    let impact = await this.prisma.impact.findUnique({ where: { id: 1 } });
    if (!impact) {
      impact = await this.prisma.impact.create({ data: { id: 1 } });
    }
    
    const programs = await this.prisma.program.findMany({
      where: { isActive: true }
    });

    const received = impact.totalFundingReceived;
    const required = impact.totalFundingRequired || 1;
    const spent = received * 0.85; // Example 85% spent assumption
    const balance = received - spent;

    return {
      impactMetrics: impact,
      financials: {
        received,
        spent,
        balance,
        utilizationPercentage: (spent / received) * 100 || 0
      },
      programs: programs.map(p => ({
        id: p.id,
        name: p.name,
        raised: p.totalRaised,
        required: p.totalRequired,
        percentage: p.totalRequired > 0 ? (p.totalRaised / p.totalRequired) * 100 : 0
      }))
    };
  }
}
