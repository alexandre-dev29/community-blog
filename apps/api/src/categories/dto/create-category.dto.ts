import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ type: String, required: true })
  categoryName: string;

  @ApiProperty({ type: String, required: true })
  categoryDescription: string;

  @ApiProperty({ type: String, required: true })
  mainImageUrl: string;
}
