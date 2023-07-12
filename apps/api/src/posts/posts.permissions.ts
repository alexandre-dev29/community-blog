import { InferSubjects, Permissions } from 'nest-casl';
import { SecurityActions } from '../../types';
import { Role } from '@prisma/client';
import { Posts } from 'types/generated/posts';

export type Subject = InferSubjects<typeof Posts>;
export const postsPermissions: Permissions<Role, Subject, SecurityActions> = {
  Admin({ can }) {
    can(SecurityActions.manage, Posts);
  },
  Editor({ user, can }) {
    can(SecurityActions.update, Posts, { authorId: user.id });
    can(SecurityActions.delete, Posts, { authorId: user.id });
  },
};
