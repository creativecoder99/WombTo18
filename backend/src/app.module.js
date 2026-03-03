import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProgramsModule } from './programs/programs.module';
import { ImpactModule } from './impact/impact.module';
import { DonationsModule } from './donations/donations.module';
import { DonorsModule } from './donors/donors.module';
import { CaseStudiesModule } from './case-studies/case-studies.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    PrismaModule,
    ProgramsModule,
    ImpactModule,
    DonationsModule,
    DonorsModule,
    CaseStudiesModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
