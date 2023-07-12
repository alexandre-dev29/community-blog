import { Role } from '@prisma/client';
import { Users } from 'types/generated/users';

export const usersStub = (): Users => {
  return {
    id: '1',
    username: 'alexandre',
    fullName: 'mwenze',
    email: 'axel.business29@gmail.com',
    createdAt: new Date(2022, 9, 30),
    updatedAt: new Date(2022, 9, 30),
    role: Role.Editor,
    password: '',
    phoneNumber: '+2438694746284',
    refreshToken: '',
    biography: 'i am a software engineer',
    Posts: [],
  };
};
