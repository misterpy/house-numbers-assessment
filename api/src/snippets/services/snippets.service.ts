import { Injectable } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';
import { InjectModel } from '@nestjs/mongoose';
import { Snippet } from '../schemas/snippet.schema';
import { Model } from 'mongoose';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<Snippet>,
    private openAiService: OpenAiService
  ) {}

  async create(dto: { text: string }) {
    const summary = await this.openAiService.summarize(dto.text);
    const snippet = await this.snippetModel.create({ text: dto.text, summary });
    return {
      id: snippet._id.toString(),
      text: snippet.text,
      summary: snippet.summary,
    };
  }

  async findOne(id: string) {
    const snippet = await this.snippetModel.findById(id);
    return {
      id: snippet._id.toString(),
      text: snippet.text,
      summary: snippet.summary,
    };
  }

  async findAll() {
    const snippets = await this.snippetModel.find();
    return snippets.map((s) => ({
      id: s._id.toString(),
      text: s.text,
      summary: s.summary,
    }));
  }
}
