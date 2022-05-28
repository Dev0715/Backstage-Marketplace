import {
  Column,
  Entity,
  BeforeInsert,
  Exclusion,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';
import { AddonIconDto } from '../dtos/addon_icon.dto';
import { User } from 'src/user/entities/user.entity';
import { Ticket } from './ticket.entity';

@Entity('addon_icons')
export class AddonIcon extends SoftDelete {
  @Column()
  src: string;

  toCollectionDto(): AddonIconDto {
    return {
      id: this.id,
      src: this.src,
    };
  }
}
