import { jest } from '@jest/globals';
import { usersStub } from '../test/stubs/users.stub';
import { AuthResponse } from '../../../types';
import { authResponseStub } from '../test/stubs/authResponse.stub';
import { Users } from 'types/generated/users';

export const UsersServiceMock: any = {
  create: jest.fn<() => Promise<Users>>().mockResolvedValue(usersStub()),

  findAll: jest.fn<() => Promise<Users[]>>().mockResolvedValue([usersStub()]),

  findOne: jest.fn<() => Promise<Users>>().mockResolvedValue(usersStub()),

  update: jest.fn<() => Promise<Users>>().mockResolvedValue(usersStub()),

  remove: jest.fn<() => Promise<Users>>().mockResolvedValue(usersStub()),
  loginUser: jest
    .fn<() => Promise<AuthResponse>>()
    .mockResolvedValue(authResponseStub()),
  registerUser: jest
    .fn<() => Promise<AuthResponse>>()
    .mockResolvedValue(authResponseStub()),
};
