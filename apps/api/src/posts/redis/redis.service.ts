import { Injectable } from '@nestjs/common';
import Redis, { RedisKey } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisInstance: Redis = null;

  constructor() {
    if (this.redisInstance == null) {
      this.redisInstance = new Redis('redis://localhost:6379');
    }
  }

  setNewValue(key: RedisKey, value: any, expirationTimeInSeconds) {
    return this.redisInstance.set(key, value, 'EX', expirationTimeInSeconds);
  }

  getValue(key: RedisKey) {
    return this.redisInstance.get(key);
  }

  incrementValue(key: RedisKey) {
    return this.redisInstance.incr(key);
  }
}
