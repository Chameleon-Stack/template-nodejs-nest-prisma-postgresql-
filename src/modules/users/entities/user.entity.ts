import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { CardEntity } from '../../cards/entities/card.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => CardEntity, (cards) => cards.user)
  cards: Relation<CardEntity[]>;

  @OneToMany(() => CategoryEntity, (categories) => categories.user)
  categories: Relation<CategoryEntity[]>;
}
