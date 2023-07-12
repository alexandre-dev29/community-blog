import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens, UserSecurity } from '../../types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UtilityService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  getTokens = async ({
    id,
    roles,
    fullName,
    email,
  }: UserSecurity): Promise<Tokens> => {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          roles,
          fullName,
          email,
          id,
        },
        {
          expiresIn: 60 * 60 * 24,
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        { sub: id },
        {
          expiresIn: 60 * 60 * 24 * 7,
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    } as Tokens;
  };

  generateSlug(title: string): string {
    // Replace any non-word characters with a hyphen
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w ]+/g, '-');

    // Replace any non-word characters with a hyphen
    const trimmedSlug = slug.replace(/[^\w-]+/g, '');
    // Append a random string of characters to the slug
    const randomString = Math.random().toString(36).slice(2, 8);
    const finalSlug = `${trimmedSlug}-${randomString}`;

    return finalSlug;
  }
}
