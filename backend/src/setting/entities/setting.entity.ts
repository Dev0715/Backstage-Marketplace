import { Column, Entity } from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';
import { SettingDto } from '../dtos/setting.dto';

@Entity('settings')
export class Setting extends SoftDelete {
  @Column()
  key: string;

  @Column()
  value: string;

  toSettingDto(): SettingDto {
    return {
      id: this.id,
      key: this.key,
      value: this.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
