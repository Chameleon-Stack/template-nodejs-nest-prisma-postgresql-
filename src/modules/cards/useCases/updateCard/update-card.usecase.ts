import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../../../categories/repositories/category.repository';
import { CategoryRepositoryInterface } from '../../../categories/repositories/interfaces/category-repository.interface';
import { CardEntity } from '../../entities/card.entity';
import { CardRepository } from '../../repositories/card.repository';
import { CardRepositoryInterface } from '../../repositories/interfaces/card-repository.interface';
import { UpdateCardDTO } from './dtos/request/update-card-request.dto';

@Injectable()
export class UpdateCardUseCase {
  constructor(
    @InjectRepository(CardRepository)
    private readonly cardRepository: CardRepositoryInterface,

    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  public async execute({
    id,
    description,
    title,
    status,
    category_ids,
  }: UpdateCardDTO): Promise<CardEntity> {
    if (!id && (!description || !title || !status)) {
      throw new BadRequestException('The id or the value was not inserted!');
    }

    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new NotFoundException('the card does not exist');
    }

    if (category_ids && category_ids?.length > 0) {
      for (const category_id of category_ids) {
        const category = await this.categoryRepository.findById(category_id);

        if (category) card.categories.push(category);
      }
    }

    if (description) {
      card.description = description;
    }

    if (title) {
      card.title = title;
    }

    if (status) {
      card.status = status;
    }

    await this.cardRepository.updateAndSave(card);

    return card;
  }
}
