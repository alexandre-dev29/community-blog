import { Posts } from './posts';
import { Role } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Users {
  @ApiProperty({ type: String })
  id: string;

  @ApiPropertyOptional({ type: String })
  username?: string;

  @ApiProperty({ type: String })
  fullName: string;

  @ApiPropertyOptional({ type: String })
  phoneNumber?: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiPropertyOptional({ type: String })
  avatarImage?: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiPropertyOptional({ type: String })
  biography?: string;

  @ApiPropertyOptional({ type: String })
  userTitle?: string;

  @ApiPropertyOptional({ type: String })
  refreshToken?: string;

  @ApiProperty({ enum: Role, enumName: 'Role' })
  role: Role = Role.Editor;

  @ApiProperty({ isArray: true, type: () => Posts })
  Posts: Posts[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
