import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';
import { CategoryRepositoryInterface } from '../../repositories/interfaces/category-repository.interface';

@Injectable()
export class GetCategoriesUseCase {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  public async execute(
    user_id: string,
    name?: string,
  ): Promise<CategoryEntity[]> {
    return this.categoryRepository.findAll(user_id, name);
  }
}
