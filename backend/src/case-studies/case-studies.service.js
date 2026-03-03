import { Injectable, Dependencies } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
@Dependencies(PrismaService)
export class CaseStudiesService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.caseStudy.findMany();
  }

  async findOneBySlug(slug) {
    return this.prisma.caseStudy.findUnique({ where: { slug } });
  }
}
