import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../entities/user.entity';
import { UserRepository } from '../../../repositories/user.repository';
import { GetUserByIdUseCase } from '../get-user-by-id.usecase';

describe('Delete user UseCase', () => {
  let getUserByIdUseCase: GetUserByIdUseCase, repository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByIdUseCase,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {
            findById: jest.fn(),
            createAndSave: jest.fn(),
          },
        },
      ],
    }).compile();

    getUserByIdUseCase = module.get<GetUserByIdUseCase>(GetUserByIdUseCase);

    repository = await module.resolve<UserRepository>(
      getRepositoryToken(UserRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(getUserByIdUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be able to get user', async () => {
    const user = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: '******',
    } as UserEntity;

    const createAndSaveUserSpy = jest
      .spyOn(repository, 'findById')
      .mockResolvedValueOnce(user);

    await getUserByIdUseCase.execute('1');

    expect(createAndSaveUserSpy).toHaveBeenCalled();
  });
});
