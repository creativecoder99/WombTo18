import { Controller, Dependencies, Get, Param, Bind } from '@nestjs/common';
import { CaseStudiesService } from './case-studies.service';

@Controller('case-studies')
@Dependencies(CaseStudiesService)
export class CaseStudiesController {
  constructor(caseStudiesService) {
    this.caseStudiesService = caseStudiesService;
  }

  @Get()
  async findAll() {
    return this.caseStudiesService.findAll();
  }

  @Get(':slug')
  @Dependencies(String)
  @Bind(Param('slug'))
  async findOne(slug) {
    return this.caseStudiesService.findOneBySlug(slug);
  }
}
