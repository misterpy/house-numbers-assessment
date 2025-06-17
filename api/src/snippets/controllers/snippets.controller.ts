import { Body, Controller, Post } from '@nestjs/common';
import { SnippetsService } from '../services/snippets.service';

@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  create(@Body() dto: { text: string }) {
    return this.snippetsService.create(dto);
  }
}
