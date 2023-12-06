import { Injectable } from '@nestjs/common';
import { FindAllCardsDTO } from '../../dtos/request/find-all-cards-request.dto';
import { CardEntityInterface } from '../../interfaces/card-entity.interface';
import { CardRepositoryInterface } from '../../repositories/interfaces/card-repository.interface';

@Injectable()
export class GetCardsUseCase {
  constructor(private readonly cardRepository: CardRepositoryInterface) {}

  public async execute(query: FindAllCardsDTO): Promise<CardEntityInterface[]> {
    return this.cardRepository.findAll(query);
  }
}
