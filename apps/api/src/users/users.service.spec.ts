import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaServiceMock } from '../prisma/__mock__/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { UtilityServiceMock } from '../utility/__mock__/utility.service';
import { usersStub } from './test/stubs/users.stub';
import { UsersServiceMock } from './__mock__/users.service';
import { AuthResponse, ResponseTypeEnum } from '../../types';
import { authResponseStub } from './test/stubs/authResponse.stub';
import { CaslModule } from 'nest-casl';
import { categoryPermissions } from '../categories/categories.permissions';
import { Users } from 'types/generated/users';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CaslModule.forFeature({ permissions: categoryPermissions })],

      providers: [
        { provide: UsersService, useValue: UsersServiceMock },
        { provide: PrismaService, useValue: PrismaServiceMock },
        { provide: UtilityService, useValue: UtilityServiceMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get All Users', () => {
    let users: Users[];
    beforeEach(async () => {
      users = (await service.findAll()) as Users[];
    });

    test('then it should call users service', async () => {
      expect(jest.spyOn(service, 'findAll')).toHaveBeenCalled();
    });
    test('then it should return users', async () => {
      expect(users).toEqual([usersStub()]);
    });
  });
  describe('Get One User', () => {
    let users: Users;
    beforeEach(async () => {
      users = (await service.findOne(usersStub().id)) as Users;
    });

    test('then it should call users service', async () => {
      expect(jest.spyOn(service, 'findOne')).toHaveBeenCalled();
    });

    test('then it should call users service with params', async () => {
      expect(jest.spyOn(service, 'findOne')).toHaveBeenCalledWith(
        usersStub().id,
      );
    });

    test('then it should return one user', async () => {
      expect(users).toEqual(usersStub());
    });
  });

  describe('Update a user', () => {
    let users: Users;
    beforeEach(async () => {
      users = (await service.update(usersStub().id, {
        fullName: usersStub().fullName,
        phoneNumber: usersStub().phoneNumber,
        biography: usersStub().biography,
      })) as Users;
    });

    test('then it should call users service update method', async () => {
      expect(jest.spyOn(service, 'update')).toHaveBeenCalled();
    });

    test('then it should call users service update method with params', async () => {
      expect(jest.spyOn(service, 'update')).toHaveBeenCalledWith(
        usersStub().id,
        {
          fullName: usersStub().fullName,
          phoneNumber: usersStub().phoneNumber,
          biography: usersStub().biography,
        },
      );
    });

    test('then it should return the user who has been updated', async () => {
      expect(users).toEqual(usersStub());
    });
  });
  describe('Delete a user', () => {
    let users: Users;
    beforeEach(async () => {
      users = (await service.remove(usersStub().id)) as Users;
    });

    test('then it should call users service remove method', async () => {
      expect(jest.spyOn(service, 'remove')).toHaveBeenCalled();
    });

    test('then it should call users service delete method with params', async () => {
      expect(jest.spyOn(service, 'remove')).toHaveBeenCalledWith(
        usersStub().id,
      );
    });

    test('then it should return the user who has been deleted', async () => {
      expect(users).toEqual(usersStub());
    });
  });
  describe('Login a user', () => {
    let authResponse: AuthResponse;
    beforeEach(async () => {
      authResponse = await service.loginUser({
        password: usersStub().password,
        email: usersStub().email,
      });
    });

    test('then it should call users service login method', async () => {
      expect(jest.spyOn(service, 'loginUser')).toHaveBeenCalled();
    });

    test('then it should call users service login method with params', async () => {
      expect(jest.spyOn(service, 'loginUser')).toHaveBeenCalledWith({
        password: usersStub().password,
        email: usersStub().email,
      });
    });

    test('then it should return the response with tokens ', async () => {
      expect(authResponse).toEqual(authResponseStub());
    });
  });
  describe('Register a user', () => {
    let authResponse:
      | Error
      | {
          responseType: ResponseTypeEnum;
          data: { role: 'Editor'; fullName: string; email: string };
          message: string;
        };
    beforeEach(async () => {
      authResponse = await service.registerUser({
        password: usersStub().password,
        email: usersStub().email,
        fullName: usersStub().fullName,
        phoneNumber: usersStub().phoneNumber,
        biography: usersStub().biography,
        userTitle: usersStub().userTitle,
        avatarImage: usersStub().avatarImage,
      });
    });

    test('then it should call users service register method', async () => {
      expect(jest.spyOn(service, 'registerUser')).toHaveBeenCalled();
    });

    test('then it should call users service register method with params', async () => {
      expect(jest.spyOn(service, 'registerUser')).toHaveBeenCalledWith({
        password: usersStub().password,
        email: usersStub().email,
        fullName: usersStub().fullName,
        phoneNumber: usersStub().phoneNumber,
        biography: usersStub().biography,
        userTitle: usersStub().userTitle,
        avatarImage: usersStub().avatarImage,
      });
    });

    test('then it should return the response with the registered user', async () => {
      expect(authResponse).toEqual(authResponseStub());
    });
  });
});
