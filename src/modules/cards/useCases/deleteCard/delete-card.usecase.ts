import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardRepository } from '../../repositories/card.repository';
import { CardRepositoryInterface } from '../../repositories/interfaces/card-repository.interface';

@Injectable()
export class DeleteCardUseCase {
  constructor(
    @InjectRepository(CardRepository)
    private readonly cardRepository: CardRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<void> {
    const card = await this.cardRepository.findById(id);

    await this.cardRepository.deleteCard(card);
  }
}
