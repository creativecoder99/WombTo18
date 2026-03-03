import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaModule } from '../prisma/prisma.module';
import { DonationsModule } from '../donations/donations.module';

@Module({
  imports: [PrismaModule, DonationsModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
