import { Module } from '@nestjs/common';
import { SnippetsController } from './controllers/snippets.controller';
import { SnippetsService } from './services/snippets.service';
import { OpenAiService } from './services/open-ai.service';

@Module({
  controllers: [SnippetsController],
  providers: [SnippetsService, OpenAiService],
})
export class SnippetsModule {}
