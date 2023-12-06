import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../../users/entities/user.entity';
import { UserRepository } from '../../../../users/repositories/user.repository';
import { CardEntity } from '../../../entities/card.entity';
import { CardRepository } from '../../../repositories/card.repository';
import { CreateCardUseCase } from '../create-card.usecase';
import { CreateCardDTO } from '../dtos/request/create-card-request.dto';

describe('Create card UseCase', () => {
  let createCardUseCase: CreateCardUseCase,
    repositoryCard: CardRepository,
    repositoryUser: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCardUseCase,
        {
          provide: getRepositoryToken(CardRepository),
          useValue: {
            createAndSave: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    createCardUseCase = module.get<CreateCardUseCase>(CreateCardUseCase);

    repositoryCard = await module.resolve<CardRepository>(
      getRepositoryToken(CardRepository),
    );

    repositoryUser = await module.resolve<UserRepository>(
      getRepositoryToken(UserRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(createCardUseCase).toBeDefined();
    expect(repositoryCard).toBeDefined();
    expect(repositoryUser).toBeDefined();
  });

  it('Should be able to create card', async () => {
    const card = {
      user_id: 'c36614aa-b41d-4b3a-b454-bed69f431ff5',
      description: 'Create card',
      status: '10',
      title: 'Card',
    } as CreateCardDTO;

    const cardCreated = Object.assign(card, { id: '1' }) as CardEntity;

    const findUserByIdSpy = jest
      .spyOn(repositoryUser, 'findById')
      .mockResolvedValueOnce({} as UserEntity);

    const createAndSaveCardSpy = jest
      .spyOn(repositoryCard, 'createAndSave')
      .mockResolvedValueOnce(cardCreated);

    const result = await createCardUseCase.execute(card);

    expect(result.id).toEqual(cardCreated.id);
    expect(findUserByIdSpy).toHaveBeenCalledWith(card.user_id);
    expect(createAndSaveCardSpy).toHaveBeenCalled();
  });
});
