import { ApiProperty } from '@nestjs/swagger';

export class SettingDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly key: string;

  @ApiProperty()
  readonly value: string;

  @ApiProperty()
  readonly createdAt: any;

  @ApiProperty()
  readonly updatedAt: any;
}
