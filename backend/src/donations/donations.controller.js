import { Controller, Dependencies, Post, Body, Bind } from '@nestjs/common';
import { DonationsService } from './donations.service';

@Controller('donations')
@Dependencies(DonationsService)
export class DonationsController {
  constructor(donationsService) {
    this.donationsService = donationsService;
  }

  @Post()
  @Bind(Body())
  async create(createDonationDto) {
    try {
      const donation = await this.donationsService.processDonation(createDonationDto);
      return { success: true, data: donation };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}
