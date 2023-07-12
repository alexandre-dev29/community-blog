import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ type: String })
  postTitle: string;

  @ApiProperty({ type: String })
  postDescription: string;

  @ApiProperty({ type: String })
  postMainImage: string;

  @ApiProperty({ type: String })
  authorId: string;
  @ApiProperty({ type: String })
  postContent: string;
  @ApiProperty({ isArray: true, type: String })
  Tags: string[];
  @ApiPropertyOptional({ type: String })
  categoryId?: string;
}
