import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../auth/jwt.strategy';
import { CaslModule } from 'nest-casl';
import { userPermissions } from './users.permissions';

@Module({
  imports: [CaslModule.forFeature({ permissions: userPermissions })],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    UtilityService,
    JwtService,
    ConfigService,
    JwtStrategy,
  ],
})
export class UsersModule {}
