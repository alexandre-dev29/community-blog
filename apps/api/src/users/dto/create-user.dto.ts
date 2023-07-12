import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String })
  fullName: string;

  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  phoneNumber: string;

  @ApiProperty({ type: String })
  userTitle: string;
  @ApiProperty({ type: String })
  biography: string;

  @ApiProperty({ type: String })
  avatarImage: string;
}
