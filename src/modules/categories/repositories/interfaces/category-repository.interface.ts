import { UserEntity } from '../../../users/entities/user.entity';
import { CategoryEntityInterface } from '../../interfaces/category-entity.interface';

export interface CategoryRepositoryInterface {
  createAndSave(
    name: string,
    user: UserEntity,
  ): Promise<CategoryEntityInterface>;
  findAll(user_id: string, name?: string): Promise<CategoryEntityInterface[]>;
  findById(id: string): Promise<CategoryEntityInterface>;
  deleteCategory(category: CategoryEntityInterface): Promise<void>;
}
