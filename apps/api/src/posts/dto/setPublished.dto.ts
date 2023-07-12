import { ApiProperty } from '@nestjs/swagger';

export class SetPublishedDto {
  @ApiProperty({ type: Boolean })
  isPublished: boolean;
  @ApiProperty({ type: String })
  id: string;
}
