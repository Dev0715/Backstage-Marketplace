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
import { User } from 'src/user/entities/user.entity';
import { Ticket } from './ticket.entity';

@Entity('event_cards')
export class EventCard extends SoftDelete {
  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  date: string;

  @Column('varchar', { length: 1023 })
  addons: string;

  @Column('varchar', { length: 1023 })
  payees: string;

  @Column('varchar', { length: 1023 })
  royalties: string;

  @Column('text', { nullable: true })
  likes_number: string;

  @Column({ nullable: true })
  background: string;

  @Column({ nullable: true })
  picture_large: string;

  @Column({ nullable: true })
  picture_small: string;

  @Column({ nullable: true })
  picture_ipfs: string;

  @Column()
  price: number;

  @Column('text', { nullable: true })
  venue_description: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  tiktok: string;

  @Column({ nullable: true })
  telegram: string;

  @Column({ nullable: true })
  discord: string;

  @ManyToOne(() => User, (user) => user.event_cards)
  creator: User;

  // @Column({ nullable: true })
  // tags: string;

  @Column()
  category: string;

  @Column()
  collection: string;

  @Column()
  green_pass_needed: boolean;

  @Column({ nullable: true })
  total_tickets: number;

  @OneToMany(() => Ticket, (ticket) => ticket.eventcard)
  tickets: Ticket[];

  @Column({ default: 0 })
  buy_count: number;

  @Column({ default: 0 })
  deleted: number;

  @Column({ nullable: true })
  owner_wallet: string;

  @Column({ nullable: true })
  owner_account: string;

  // @Column({nullable: true})
  // fee_percentage: string;

  // @Column('varchar', { length: 1023 })
  // payee_wallet: string;

  // @Column('varchar', { length: 1023 })
  // payee_account: string;

  // @Column('varchar', { length: 1023 })
  // payee_fee: string;

  toEventCardDto(): EventCardDto {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      date: this.date,
      addons: this.addons,
      likes_number: this.likes_number,
      background: this.background,
      picture_large: this.picture_large,
      picture_small: this.picture_small,
      price: this.price,
      venue_description: this.venue_description,
      description: this.description,
      facebook: this.facebook,
      twitter: this.twitter,
      instagram: this.instagram,
      tiktok: this.tiktok,
      telegram: this.telegram,
      discord: this.discord,
      creator: this.creator.toUserDto(),
      // tags: this.tags,
      category: this.category,
      collection: this.collection,
      green_pass_needed: this.green_pass_needed,
      total_tickets: this.total_tickets,
      buy_count: this.buy_count,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deleted: this.deleted,
      owner_wallet: this.owner_wallet,
      owner_account: this.owner_account,
      payees: this.payees,
      royalties: this.royalties,
      // fee_percentage: this.fee_percentage,
      // payee_wallet: this.payee_wallet,
      // payee_account: this.payee_account,
      // payee_fee: this.payee_fee,
    };
  }
}
