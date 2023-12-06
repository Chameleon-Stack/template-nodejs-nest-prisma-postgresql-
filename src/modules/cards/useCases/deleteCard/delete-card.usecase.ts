import { Injectable } from '@nestjs/common';
import { CardRepositoryInterface } from '../../repositories/interfaces/card-repository.interface';

@Injectable()
export class DeleteCardUseCase {
  constructor(private readonly cardRepository: CardRepositoryInterface) {}

  public async execute(id: string): Promise<void> {
    const card = await this.cardRepository.findById(id);

    await this.cardRepository.deleteCard(card);
  }
}
