import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllCardsDTO } from '../../dtos/request/find-all-cards-request.dto';
import { CardEntity } from '../../entities/card.entity';
import { CardRepository } from '../../repositories/card.repository';
import { CardRepositoryInterface } from '../../repositories/interfaces/card-repository.interface';

@Injectable()
export class GetCardsUseCase {
  constructor(
    @InjectRepository(CardRepository)
    private readonly cardRepository: CardRepositoryInterface,
  ) {}

  public async execute(query: FindAllCardsDTO): Promise<CardEntity[]> {
    return this.cardRepository.findAll(query);
  }
}
