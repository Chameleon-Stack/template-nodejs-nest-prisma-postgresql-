import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryRepository } from '../../../../categories/repositories/category.repository';
import { CardRepository } from '../../../repositories/card.repository';
import { UpdateCardUseCase } from '../update-card.usecase';

describe('Update card UseCase', () => {
  let updateCardUseCase: UpdateCardUseCase,
    repositoryCard: CardRepository,
    repositoryCategory: CategoryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCardUseCase,
        {
          provide: getRepositoryToken(CardRepository),
          useValue: {
            findById: jest.fn(),
            updateAndSave: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CategoryRepository),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    updateCardUseCase = module.get<UpdateCardUseCase>(UpdateCardUseCase);

    repositoryCard = await module.resolve<CardRepository>(
      getRepositoryToken(CardRepository),
    );

    repositoryCategory = await module.resolve<CategoryRepository>(
      getRepositoryToken(CategoryRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(updateCardUseCase).toBeDefined();
    expect(repositoryCard).toBeDefined();
    expect(repositoryCategory).toBeDefined();
  });
});
