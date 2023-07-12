import { InferSubjects, Permissions } from 'nest-casl';
import { SecurityActions } from '../../types';
import { Role } from '@prisma/client';
import { Users } from 'types/generated/users';

export type Subject = InferSubjects<typeof Users>;
export const userPermissions: Permissions<Role, Subject, SecurityActions> = {
  Admin({ can }) {
    can(SecurityActions.manage, Users);
  },
  Editor({ user, can }) {
    can(SecurityActions.update, Users, { id: user.id });
    can(SecurityActions.readOne, Users, { id: user.id });
  },
};
