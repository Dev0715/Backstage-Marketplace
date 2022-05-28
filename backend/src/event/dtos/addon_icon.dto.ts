import { ApiProperty } from '@nestjs/swagger';

export class AddonIconDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly src: string;
}
