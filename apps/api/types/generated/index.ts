import { Users as _Users } from './users';
import { Categories as _Categories } from './categories';
import { Posts as _Posts } from './posts';
import { Subscribers as _Subscribers } from './subscribers';
import { UserVisites as _UserVisites } from './user_visites';

export namespace PrismaModel {
  export class Users extends _Users {}
  export class Categories extends _Categories {}
  export class Posts extends _Posts {}
  export class Subscribers extends _Subscribers {}
  export class UserVisites extends _UserVisites {}

  export const extraModels = [
    Users,
    Categories,
    Posts,
    Subscribers,
    UserVisites,
  ];
}
