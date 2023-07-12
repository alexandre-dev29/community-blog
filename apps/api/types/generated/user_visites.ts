import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserVisites {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  sessionId: string;

  @ApiProperty({ type: String })
  ipAddress: string;

  @ApiProperty({ type: String })
  device: string;

  @ApiPropertyOptional({ type: String })
  location?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
