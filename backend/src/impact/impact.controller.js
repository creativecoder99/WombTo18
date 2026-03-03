import { Controller, Dependencies, Get } from '@nestjs/common';
import { ImpactService } from './impact.service';

@Controller('impact')
@Dependencies(ImpactService)
export class ImpactController {
  constructor(impactService) {
    this.impactService = impactService;
  }

  @Get()
  async getImpact() {
    return this.impactService.getImpact();
  }
}
