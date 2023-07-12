import { AuthResponse, ResponseTypeEnum } from '../../../../types';
import { usersStub } from './users.stub';

export const authResponseStub = (): AuthResponse => {
  return {
    message: 'Login Successfully',
    responseType: ResponseTypeEnum.SUCCESS,
    refreshToken: usersStub().refreshToken,
    accessToken: '',
    data: {
      fullName: usersStub().fullName,
      email: usersStub().email,
      id: usersStub().id,
      role: usersStub().role,
      phoneNumber: usersStub().phoneNumber,
    },
  };
};
