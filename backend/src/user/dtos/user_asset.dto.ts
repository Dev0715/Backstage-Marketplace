import { ApiProperty } from '@nestjs/swagger';

export class UserAssetDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly src: string;
}
