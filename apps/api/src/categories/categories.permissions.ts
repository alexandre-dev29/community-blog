import { InferSubjects, Permissions } from 'nest-casl';
import { SecurityActions } from '../../types';
import { Role } from '@prisma/client';
import { Categories } from 'types/generated/categories';

export type Subject = InferSubjects<typeof Categories>;
export const categoryPermissions: Permissions<Role, Subject, SecurityActions> =
  {
    Admin({ can }) {
      can(SecurityActions.manage, Categories);
    },
  };
