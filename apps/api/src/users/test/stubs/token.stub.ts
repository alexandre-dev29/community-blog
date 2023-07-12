import { Tokens } from '../../../../types';

export const tokenStub = (): Tokens => {
  return {
    access_token: 'this is access token',
    refresh_token: 'this is refresh token',
  };
};
