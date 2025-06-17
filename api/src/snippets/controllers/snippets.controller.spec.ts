import { Test, TestingModule } from '@nestjs/testing';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from '../services/snippets.service';

describe('SnippetsController', () => {
  let controller: SnippetsController;
  let service: SnippetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnippetsController],
      providers: [
        {
          provide: SnippetsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SnippetsController>(SnippetsController);
    service = module.get<SnippetsService>(SnippetsService);
  });

  it('should create a new snippet', async () => {
    const dto = { text: 'Test is a full input.' };
    const result = {
      id: 'abc123',
      text: dto.text,
      summary: 'This is a summary.',
    };

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all snippets', async () => {
    const result = [
      { id: '1', text: 'foo', summary: 'bar' },
      { id: '2', text: 'baz', summary: 'qux' },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
  });

  it('should return one snippet by id', async () => {
    const result = { id: '1', text: 'foo', summary: 'bar' };

    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
  });
});
