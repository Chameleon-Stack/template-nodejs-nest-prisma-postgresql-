import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepositoryInterface } from '../../../users/repositories/interfaces/user-repository.interface';
import { CardEntityInterface } from '../../interfaces/card-entity.interface';
import { CardRepositoryInterface } from '../../repositories/interfaces/card-repository.interface';
import { CreateCardDTO } from './dtos/request/create-card-request.dto';

@Injectable()
export class CreateCardUseCase {
  constructor(
    private readonly cardRepository: CardRepositoryInterface,

    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute({
    user_id,
    description,
    title,
    status,
  }: CreateCardDTO): Promise<CardEntityInterface> {
    if (!user_id || !description || !title || !status) {
      throw new BadRequestException('Error in the creation of the card!');
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('User does not exists!');
    }

    const card = await this.cardRepository.createAndSave({
      status,
      title,
      description,
      user,
    });

    return card;
  }
}
