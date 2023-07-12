import {IPost as Posts} from "./posts";

export interface ICategory {
  id: string;

  categoryName: string;

  categoryDescription: string;

  mainImageUrl: string;

  categorySlug: string;

  posts: Posts[];

  createdAt: Date;

  updatedAt: Date;
}
