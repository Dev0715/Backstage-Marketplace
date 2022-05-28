import {
  Column,
  Entity,
  BeforeInsert,
  Exclusion,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';
import { EventCardDto } from '../dtos/evet_card.dto';
import { CollectionDto } from '../dtos/collection.dto';
import { User } from 'src/user/entities/user.entity';
import { Ticket } from './ticket.entity';

@Entity('collections')
export class Collection extends SoftDelete {
  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  wallet_address: string;

  @Column({ nullable: true })
  picture_large: string;

  @Column({ nullable: true })
  picture_small: string;

  @Column({ nullable: true })
  picture_ipfs: string;

  @Column({ default: 0 })
  deleted: number;

  @ManyToOne(() => User, user => user.collections)
  creator: User;

  toCollectionDto(): CollectionDto {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      creator: this.creator.toUserDto(),
      wallet_address: this.wallet_address,
      picture_large: this.picture_large,
      picture_small: this.picture_small,
      picture_ipfs: this.picture_ipfs,
      deleted: this.deleted,
    };
  }
}
