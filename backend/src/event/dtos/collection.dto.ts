import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dtos/user.dto';

export class CollectionDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly category: string;

  @ApiProperty()
  readonly wallet_address: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly picture_large: string;

  @ApiProperty()
  readonly picture_small: string;

  @ApiProperty()
  picture_ipfs: string;

  @ApiProperty()
  readonly deleted: any;

  @ApiProperty()
  readonly creator: UserDto;
}
