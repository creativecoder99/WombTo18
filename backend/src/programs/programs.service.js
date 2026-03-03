import { Injectable, Dependencies } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
@Dependencies(PrismaService)
export class ProgramsService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.program.findMany({
      where: { isActive: true },
      orderBy: { totalRequired: 'desc' }
    });
  }

  async findOne(id) {
    return this.prisma.program.findUnique({ where: { id } });
  }
}
