import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { SnippetsService } from '../services/snippets.service';

@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  create(@Body() dto: { text: string }) {
    return this.snippetsService.create(dto);
  }

  @Get()
  findAll() {
    return this.snippetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snippetsService.findOne(id);
  }
}
