import { Injectable, NestMiddleware, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as UAParser from 'ua-parser-js';
import * as geoip from 'geoip-lite';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from './redis/redis.service';
import { cookieOption } from '../../types';
import * as crypto from 'crypto';

@Injectable()
export class PostCountMiddleware implements NestMiddleware {
  constructor(
    private prismaService: PrismaService,
    private redisService: RedisService,
  ) {}

  use(
    req: Request,
    @Res({ passthrough: true }) res: Response,
    next: NextFunction,
  ) {
    // Check if the user has a session ID stored in their cookies
    let sessionId = req.cookies['session-id'];
    if (!sessionId) {
      // Generate a new session ID if the user doesn't have one yet

      sessionId = `${crypto.getRandomValues(new Uint32Array(1))[0]}`;
      res.cookie('session-id', sessionId, {
        ...cookieOption,
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,
      });
    }
    this.redisService
      .getValue(`visit:${sessionId}`)
      .then(async (cachedVisit) => {
        if (!cachedVisit) {
          const ipAddress =
            `${req.headers['x-forwarded-for']}` || req.socket.remoteAddress;
          const userAgent = req.headers['user-agent'];
          const parser = new UAParser();
          const device = parser.setUA(userAgent).getDevice();
          const location = geoip.lookup(ipAddress);

          const userVisited = await this.prismaService.userVisites.create({
            data: {
              sessionId: sessionId,
              device: `${JSON.stringify(device)}`,
              ipAddress: ipAddress,
              location: location
                ? `${location.country}, ${location.region}`
                : null,
            },
          });
          this.redisService.setNewValue(
            `visit:${sessionId}`,
            JSON.stringify(userVisited),
            86400, // 24 hours
          );

          if (req.query.slug) {
            const currentPost = await this.prismaService.posts.findUnique({
              where: { postSlug: `${req.query.slug}` },
            });
            await this.prismaService.posts.update({
              where: { id: currentPost.id },
              data: { postViewCount: currentPost.postViewCount + 1 },
            });
          }
        }
      });

    this.redisService.incrementValue('visit-count');
    next();
  }
}
