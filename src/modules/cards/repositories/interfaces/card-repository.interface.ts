import { CreateAndSaveCardDTO } from '../../dtos/request/create-card-request.dto';
import { FindAllCardsDTO } from '../../dtos/request/find-all-cards-request.dto';
import { CardEntity } from '../../entities/card.entity';

export interface CardRepositoryInterface {
  createAndSave(card: CreateAndSaveCardDTO): Promise<CardEntity>;
  updateAndSave(user: CardEntity): Promise<CardEntity>;
  findById(id: string): Promise<CardEntity | null>;
  findAll(query: FindAllCardsDTO): Promise<CardEntity[]>;
  deleteCard(user: CardEntity): Promise<void>;
}
