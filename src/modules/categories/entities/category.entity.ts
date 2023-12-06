import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { CardEntity } from '../../cards/entities/card.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('Category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  name: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => UserEntity, (user) => user.cards, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @ManyToMany(() => CardEntity, (card) => card.categories, {
    onDelete: 'SET NULL',
  })
  cards: Relation<CardEntity[]>;
}
