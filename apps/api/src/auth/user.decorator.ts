import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserSecurity } from 'types/UserSecurity';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const { id, fullName, roles, email }: UserSecurity = context
      .switchToHttp()
      .getRequest().user;

    return { id, fullName, roles, email };
  },
);
