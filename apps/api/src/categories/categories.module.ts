import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CaslModule } from 'nest-casl';
import { categoryPermissions } from './categories.permissions';
import { UtilityService } from '../utility/utility.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [CaslModule.forFeature({ permissions: categoryPermissions })],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    PrismaService,
    UtilityService,
    JwtService,
    ConfigService,
  ],
})
export class CategoriesModule {}
