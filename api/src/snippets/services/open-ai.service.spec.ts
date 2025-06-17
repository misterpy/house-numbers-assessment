import { Test, TestingModule } from '@nestjs/testing';
import { OpenAiService } from './open-ai.service';
import { ConfigService } from '@nestjs/config';

const mockCreate = jest.fn();
jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    })),
  };
});

describe('OpenAiService', () => {
  let service: OpenAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenAiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('fake-api-key'),
          },
        },
      ],
    }).compile();

    service = module.get<OpenAiService>(OpenAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should summarize text using OpenAI', async () => {
    const inputText = 'This is a full text input.';
    const fakeSummary = 'This is a summary.';

    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: fakeSummary,
          },
        },
      ],
    });

    const result = await service.summarize(inputText);
    expect(result).toBe(fakeSummary);
    expect(mockCreate).toHaveBeenCalledWith({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Summarize in ≤ 30 words: ${inputText}`,
        },
      ],
    });
  });
});
