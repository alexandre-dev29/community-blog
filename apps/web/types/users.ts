import {IPost as Posts} from "./posts";
import {Role} from "./uiTypes";

export interface IUser {
  id: string;

  username?: string;

  fullName: string;

  phoneNumber?: string;

  password: string;

  avatarImage?: string;
  userTitle?: string;

  email: string;

  biography?: string;

  refreshToken?: string;

  role: Role;

  Posts: Posts[];

  createdAt: Date;

  updatedAt: Date;
}
