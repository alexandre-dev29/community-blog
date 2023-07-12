import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaServiceMock } from '../prisma/__mock__/prisma.service';
import { CaslModule } from 'nest-casl';
import { categoryPermissions } from './categories.permissions';
import { UtilityService } from '../utility/utility.service';
import { UtilityServiceMock } from '../utility/__mock__/utility.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      imports: [CaslModule.forFeature({ permissions: categoryPermissions })],

      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: PrismaServiceMock },
        { provide: UtilityService, useValue: UtilityServiceMock },
        JwtService,
        ConfigService,
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
