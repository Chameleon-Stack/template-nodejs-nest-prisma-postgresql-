import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync } from 'bcryptjs';
import { ICreateUserDTO } from '../../dtos/request/create-user-request.dto';
import { UserEntity } from '../../entities/user.entity';
import { UserRepositoryInterface } from '../../repositories/interfaces/user-repository.interface';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute({
    name,
    email,
    password,
    photo,
  }: ICreateUserDTO): Promise<UserEntity> {
    if (!name || !email || !password) {
      throw new BadRequestException('Missins params!');
    }

    const foundUser = await this.userRepository.findByEmail(email);

    if (foundUser) {
      throw new BadRequestException('User already exists!');
    }

    const salt = genSaltSync(8);
    const hash = hashSync(password, salt);

    const user = (await this.userRepository.createAndSave({
      name,
      email,
      password: hash,
      photo,
    })) as UserEntity;

    return { ...user, password: '' };
  }
}
