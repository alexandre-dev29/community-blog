import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ type: String })
  fullName: string;

  @ApiProperty({ type: String })
  phoneNumber: string;

  @ApiPropertyOptional({ type: String })
  biography?: string;
}
