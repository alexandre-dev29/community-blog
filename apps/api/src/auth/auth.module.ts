import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [JwtStrategy, ConfigService],
})
export class AuthModule {}
