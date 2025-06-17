import { Test, TestingModule } from '@nestjs/testing';
import { SnippetsService } from './snippets.service';
import { getModelToken } from '@nestjs/mongoose';
import { Snippet } from '../schemas/snippet.schema';
import { OpenAiService } from './open-ai.service';

describe('SnippetsService', () => {
  let service: SnippetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SnippetsService,
        { provide: getModelToken(Snippet.name), useValue: {} },
        { provide: OpenAiService, useValue: { summarize: jest.fn() } },
      ],
    }).compile();

    service = module.get<SnippetsService>(SnippetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a snippet with summary', async () => {
    const text = 'This is an full text input.';
    const summary = 'This is a summary.';

    const snippetModelMock = {
      create: jest.fn().mockResolvedValue({ _id: 'abc123', text, summary }),
    };

    (service as any).snippetModel = snippetModelMock;
    (service as any).openAiService = {
      summarize: jest.fn().mockResolvedValue(summary),
    };

    const result = await service.create({ text });

    expect(result).toEqual({ id: 'abc123', text, summary });
    expect(snippetModelMock.create).toHaveBeenCalledWith({ text, summary });
  });

  it('should return one snippet by id', async () => {
    const snippet = { _id: '1', text: 'foo', summary: 'bar' };

    const snippetModelMock = {
      findById: jest.fn().mockResolvedValue(snippet),
    };

    (service as any).snippetModel = snippetModelMock;

    const result = await service.findOne('1');
    expect(result).toEqual({ id: '1', text: 'foo', summary: 'bar' });
  });

  it('should return all snippets', async () => {
    const mockSnippets = [
      { _id: '1', text: 'foo', summary: 'bar' },
      { _id: '2', text: 'baz', summary: 'qux' },
    ];

    const snippetModelMock = {
      find: jest.fn().mockResolvedValue(mockSnippets),
    };

    (service as any).snippetModel = snippetModelMock;

    const result = await service.findAll();
    expect(result).toEqual([
      { id: '1', text: 'foo', summary: 'bar' },
      { id: '2', text: 'baz', summary: 'qux' },
    ]);
  });
});
