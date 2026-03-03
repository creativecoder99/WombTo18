import { Controller, Dependencies, Get, Param, Bind } from '@nestjs/common';
import { ProgramsService } from './programs.service';

@Controller('programs')
@Dependencies(ProgramsService)
export class ProgramsController {
  constructor(programsService) {
    this.programsService = programsService;
  }

  @Get()
  async findAll() {
    return this.programsService.findAll();
  }

  @Get(':id')
  @Dependencies(String)
  @Bind(Param('id'))
  async findOne(id) {
    return this.programsService.findOne(id);
  }
}
