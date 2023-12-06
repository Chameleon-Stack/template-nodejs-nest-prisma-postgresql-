import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllCardsDTO } from '../../../cards/dtos/request/find-all-cards-request.dto';
import { CardRepository } from '../../../cards/repositories/card.repository';
import { CardRepositoryInterface } from '../../../cards/repositories/interfaces/card-repository.interface';
import { CategoryRepository } from '../../../categories/repositories/category.repository';
import { CategoryRepositoryInterface } from '../../../categories/repositories/interfaces/category-repository.interface';
import { UserRepositoryInterface } from '../../repositories/interfaces/user-repository.interface';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepositoryInterface,

    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepositoryInterface,

    @InjectRepository(CardRepository)
    private readonly cardRepository: CardRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exists!');
    }

    const categories = await this.categoryRepository.findAll(id);

    for await (const category of categories) {
      try {
        await this.categoryRepository.deleteCategory(category);
      } catch (err) {
        throw new BadRequestException(`Error deleting category ${err}`);
      }
    }

    const cards = await this.cardRepository.findAll({
      user_id: id,
    } as FindAllCardsDTO);

    for await (const card of cards) {
      try {
        await this.cardRepository.deleteCard(card);
      } catch (err) {
        throw new BadRequestException(`Error deleting card ${err}`);
      }
    }

    await this.userRepository.deleteUser(user);
  }
}
