import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { UtilityService } from './utility/utility.service';
import { UserSecurity } from '../types';
import { CaslModule } from 'nest-casl';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { PostCountMiddleware } from './posts/posts.middleware';
import { RedisService } from './posts/redis/redis.service';
import { Role } from '@prisma/client';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  imports: [
    UsersModule,
    CaslModule.forRoot<Role, UserSecurity>({
      superuserRole: Role.Admin,
      getUserFromRequest: (request) => request.user,
    }),
    AuthModule,
    PostsModule,
    CategoriesModule,
    SubscribersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UtilityService,
    JwtService,
    ConfigService,
    RedisService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(PostCountMiddleware)
      .forRoutes(
        { path: 'posts/countVisit/main', method: RequestMethod.GET },
        { path: 'posts/getPosts/getPostsBySlug', method: RequestMethod.GET },
      );
  }
}
