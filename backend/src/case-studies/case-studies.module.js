import { Module } from '@nestjs/common';
import { CaseStudiesController } from './case-studies.controller';
import { CaseStudiesService } from './case-studies.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CaseStudiesController],
  providers: [CaseStudiesService],
})
export class CaseStudiesModule {}
