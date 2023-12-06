import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '../../../../../prisma.service';
import { CategoryEntityInterface } from '../../../interfaces/category-entity.interface';
import { CreateCategoryController } from '../create-category.controller';
import { CreateCategoryUseCase } from '../create-category.usecase';

describe('Create category Controller', () => {
  let app: INestApplication;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CreateCategoryController],
      providers: [
        CreateCategoryUseCase,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    createCategoryUseCase = moduleRef.get<CreateCategoryUseCase>(
      CreateCategoryUseCase,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(createCategoryUseCase).toBeDefined();
  });

  it('Should be able to create category and return status 201', async () => {
    const category = { name: 'Test category' } as CategoryEntityInterface;

    const createCategoryUseCaseSpy = jest
      .spyOn(createCategoryUseCase, 'execute')
      .mockResolvedValueOnce(category);

    const result = await request(app.getHttpServer())
      .post('/category/c36614aa-b41d-4b3a-b454-bed69f431ff5')
      .send('Test category')
      .expect(HttpStatus.CREATED);

    expect(result.body).toEqual(category);
    expect(createCategoryUseCaseSpy).toHaveBeenCalled();
  });
});
