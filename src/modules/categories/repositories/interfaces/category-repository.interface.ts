import { UserEntity } from '../../../users/entities/user.entity';
import { CategoryEntity } from '../../entities/category.entity';

export interface CategoryRepositoryInterface {
  createAndSave(name: string, user: UserEntity): Promise<CategoryEntity>;
  findAll(user_id: string, name?: string): Promise<CategoryEntity[]>;
  findById(id: string): Promise<CategoryEntity>;
  deleteCategory(category: CategoryEntity): Promise<void>;
}
