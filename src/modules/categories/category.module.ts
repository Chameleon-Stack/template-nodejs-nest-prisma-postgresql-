import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UserRepository } from '../users/repositories/user.repository';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategoryController } from './useCases/createCategory/create-category.controller';
import { CreateCategoryUseCase } from './useCases/createCategory/create-category.usecase';
import { DeleteCategoryController } from './useCases/deleteCategory/delete-category.controller';
import { DeleteCategoryUseCase } from './useCases/deleteCategory/delete-category.usecase';
import { GetCategoriesController } from './useCases/getCategories/get-categories.controller';
import { GetCategoriesUseCase } from './useCases/getCategories/get-categories.usecase';

@Module({
  imports: [PrismaService],
  providers: [
    CreateCategoryUseCase,
    CategoryRepository,
    UserRepository,
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    GetCategoriesUseCase,
  ],
  controllers: [
    CreateCategoryController,
    DeleteCategoryController,
    GetCategoriesController,
  ],
})
export class CategoryModule {}
