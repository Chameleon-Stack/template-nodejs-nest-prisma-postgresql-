import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardEntity } from '../../../../cards/entities/card.entity';
import { CardRepository } from '../../../../cards/repositories/card.repository';
import { CategoryEntity } from '../../../../categories/entities/category.entity';
import { CategoryRepository } from '../../../../categories/repositories/category.repository';
import { UserEntity } from '../../../entities/user.entity';
import { UserRepository } from '../../../repositories/user.repository';
import { DeleteUserUseCase } from '../delete-user.usecase';

describe('Delete user UseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase,
    repositoryCard: CardRepository,
    repositoryCategory: CategoryRepository,
    repositoryUser: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {
            findById: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CategoryRepository),
          useValue: {
            findAll: jest.fn(),
            deleteCategory: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CardRepository),
          useValue: {
            findAll: jest.fn(),
            deleteCard: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);

    repositoryUser = await module.resolve<UserRepository>(
      getRepositoryToken(UserRepository),
    );

    repositoryCategory = await module.resolve<CategoryRepository>(
      getRepositoryToken(CategoryRepository),
    );

    repositoryCard = await module.resolve<CardRepository>(
      getRepositoryToken(CardRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(deleteUserUseCase).toBeDefined();
    expect(repositoryCard).toBeDefined();
    expect(repositoryCategory).toBeDefined();
    expect(repositoryUser).toBeDefined();
  });

  it('Should be able to delete user', async () => {
    const user = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: '******',
    } as UserEntity;

    const findAllCardsSpy = jest
      .spyOn(repositoryCard, 'findAll')
      .mockResolvedValueOnce([{} as CardEntity]);

    const deleteCardSpy = jest.spyOn(repositoryCard, 'deleteCard');

    const findAllCategorysSpy = jest
      .spyOn(repositoryCategory, 'findAll')
      .mockResolvedValueOnce([{} as CategoryEntity]);

    const deleteCategorySpy = jest.spyOn(repositoryCategory, 'deleteCategory');

    const findUserSpy = jest
      .spyOn(repositoryUser, 'findById')
      .mockResolvedValueOnce(user);

    const deleteUserSpy = jest.spyOn(repositoryUser, 'deleteUser');

    await deleteUserUseCase.execute('1');

    expect(findAllCardsSpy).toHaveBeenCalled();
    expect(deleteCardSpy).toHaveBeenCalled();
    expect(findAllCategorysSpy).toHaveBeenCalled();
    expect(deleteCategorySpy).toHaveBeenCalled();
    expect(findUserSpy).toHaveBeenCalled();
    expect(deleteUserSpy).toHaveBeenCalledWith(user);
  });
});
