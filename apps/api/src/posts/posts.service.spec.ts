import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { UtilityService } from '../utility/utility.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaServiceMock } from '../prisma/__mock__/prisma.service';
import { UtilityServiceMock } from '../utility/__mock__/utility.service';
import { CaslModule } from 'nest-casl';
import { categoryPermissions } from '../categories/categories.permissions';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CaslModule.forFeature({ permissions: categoryPermissions })],

      providers: [
        PostsService,
        { provide: PrismaService, useValue: PrismaServiceMock },
        { provide: UtilityService, useValue: UtilityServiceMock },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
