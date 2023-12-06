import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryInterface } from '../../../users/repositories/interfaces/user-repository.interface';
import { UserRepository } from '../../../users/repositories/user.repository';
import { CategoryEntity } from '../../entities/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';
import { CategoryRepositoryInterface } from '../../repositories/interfaces/category-repository.interface';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepositoryInterface,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute(name: string, user_id: string): Promise<CategoryEntity> {
    if (!name || !user_id) {
      throw new BadRequestException('Name/User id is required!');
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('User does not exists!');
    }

    const card = await this.categoryRepository.createAndSave(name, user);

    return card;
  }
}
