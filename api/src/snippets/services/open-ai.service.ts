import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
  constructor(private config: ConfigService) {
    this.openai = new OpenAI({ apiKey: config.get('OPENAI_API_KEY') });
  }

  private openai: OpenAI;

  async summarize(text: string): Promise<string> {
    const res = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: `Summarize in ≤ 30 words: ${text}` }],
    });

    return res.choices[0].message.content.trim();
  }
}
