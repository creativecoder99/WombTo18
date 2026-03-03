import { Controller, Post, Body, Dependencies, HttpException, HttpStatus, Bind } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
@Dependencies(PaymentService)
export class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  @Post('create-order')
  @Bind(Body())
  async createOrder(body) {
    try {
      const { donorName, email, amount, programId, purpose, paymentMode } = body;
      return await this.paymentService.createOrder(donorName, email, amount, programId, purpose, paymentMode);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('verify')
  @Bind(Body())
  async verifyPayment(body) {
    try {
      const { orderId, paymentId, status } = body;
      return await this.paymentService.verifyPayment(orderId, paymentId, status);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
