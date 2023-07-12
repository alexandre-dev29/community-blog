import { Posts } from './posts';
import { ApiProperty } from '@nestjs/swagger';

export class Categories {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  categoryName: string;

  @ApiProperty({ type: String })
  categoryDescription: string;

  @ApiProperty({ type: String })
  mainImageUrl: string;

  @ApiProperty({ type: String })
  categorySlug: string;

  @ApiProperty({ isArray: true, type: () => Posts })
  posts: Posts[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
