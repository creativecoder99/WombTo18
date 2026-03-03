import { Controller, Dependencies, Get, Param, Query, Bind } from '@nestjs/common';
import { DonorsService } from './donors.service';

@Controller('donors')
@Dependencies(DonorsService)
export class DonorsController {
  constructor(donorsService) {
    this.donorsService = donorsService;
  }

  @Get('recent')
  async getRecentDonors() {
    return this.donorsService.getRecentDonors();
  }

  @Get('top')
  async getTopDonors() {
    return this.donorsService.getTopDonors();
  }

  @Get('dashboard')
  @Dependencies(String)
  @Bind(Query('email'))
  async getDashboard(email) {
    try {
      const data = await this.donorsService.getDonorDashboard(email);
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}
