import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryRepositoryInterface } from './interfaces/category-repository.interface';

@Injectable()
export class CategoryRepository
  extends Repository<CategoryEntity>
  implements CategoryRepositoryInterface
{
  constructor(private readonly dataSource: DataSource) {
    super(CategoryEntity, dataSource.manager);
  }
  public async createAndSave(
    name: string,
    user: UserEntity,
  ): Promise<CategoryEntity> {
    const category = this.create({ name, user });

    return await this.save(category);
  }

  public async findById(id: string): Promise<CategoryEntity> {
    return this.dataSource
      .createQueryBuilder(CategoryEntity, 'category')
      .select('*')
      .where(`"category"."id" = '${id}'`)
      .getRawOne();
  }

  public async findAll(
    user_id: string,
    name?: string,
  ): Promise<CategoryEntity[]> {
    const query = this.dataSource
      .createQueryBuilder(CategoryEntity, 'category')
      .select('*')
      .where(`category.user_id = '${user_id}'`);

    if (name) {
      query.andWhere(`lower(category.name) ilike '%${name}%'`);
    }

    return query.getRawMany();
  }

  public async deleteCategory(category: CategoryEntity): Promise<void> {
    await this.remove(category);
  }
}
