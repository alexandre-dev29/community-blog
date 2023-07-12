import { jest } from '@jest/globals';
import { usersStub } from '../../users/test/stubs/users.stub';
import { Users } from 'types/generated/users';

export const PrismaServiceMock: any = {
  create: jest.fn<() => Promise<Users>>().mockResolvedValue(usersStub()),

  findMany: jest.fn<() => Promise<Users[]>>().mockResolvedValue([usersStub()]),

  findOne: jest.fn<() => Promise<Users>>().mockResolvedValue(usersStub()),
  findUnique: jest.fn<() => Promise<Users>>().mockResolvedValue(usersStub()),
  findFirst: jest.fn<() => Promise<Users>>().mockResolvedValue(usersStub()),

  update: jest.fn<() => Promise<Users>>().mockResolvedValue(usersStub()),

  delete: jest.fn<() => Promise<Users>>().mockResolvedValue(usersStub()),

  save: jest.fn(),
};
