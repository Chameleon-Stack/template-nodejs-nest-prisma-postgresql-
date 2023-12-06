import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ICreateUserDTO } from '../dtos/request/create-user-request.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements UserRepositoryInterface
{
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }
  public async createAndSave(new_user: ICreateUserDTO): Promise<UserEntity> {
    const user = this.create(new_user);

    return await this.save(user);
  }
  public async updateAndSave(user: UserEntity): Promise<UserEntity> {
    return await this.save(user);
  }
  public async findById(id: string): Promise<UserEntity> {
    return this.dataSource
      .createQueryBuilder(UserEntity, 'user')
      .select('*')
      .where(`"user"."id" = '${id}'`)
      .getRawOne();
  }
  public async findByEmail(email: string): Promise<UserEntity> {
    return this.dataSource
      .createQueryBuilder(UserEntity, 'user')
      .select('*')
      .where(`"user"."email" = '${email}'`)
      .getRawOne();
  }
  public async deleteUser(user: UserEntity): Promise<void> {
    await this.remove(user);
  }
}
