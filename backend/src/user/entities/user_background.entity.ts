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
import { UserAssetDto } from '../dtos/user_asset.dto';
  
  @Entity('user_backgrounds')
  export class UserBackground extends SoftDelete {
    @Column()
    src: string;
  
    toCollectionDto(): UserAssetDto {
      return {
        id: this.id,
        src: this.src,
      };
    }
  }
  