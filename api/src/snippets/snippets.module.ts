import { Module } from '@nestjs/common';
import { SnippetsController } from './controllers/snippets.controller';
import { SnippetsService } from './services/snippets.service';
import { OpenAiService } from './services/open-ai.service';
import { Snippet, SnippetSchema } from './schemas/snippet.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }]),
  ],
  controllers: [SnippetsController],
  providers: [SnippetsService, OpenAiService],
})
export class SnippetsModule {}
