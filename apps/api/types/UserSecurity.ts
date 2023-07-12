import { AuthorizableUser } from 'nest-casl';
import { Role } from '@prisma/client';

export class UserSecurity implements AuthorizableUser<Role, string> {
  id: string;
  roles: Array<Role>;
  email: string;
  fullName: string;
}
