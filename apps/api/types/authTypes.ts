import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CookieOptions } from 'express';
import { Users } from './generated/users';

export enum ResponseTypeEnum {
  SUCCESS,
  ERROR,
}

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
export const cookieOption: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
  domain:
    process.env.NODE_ENV === 'production' ? 'axelmwenze.dev' : 'localhost',
  expires: new Date(new Date().setDate(new Date().getDate() + 1)),
};

export class AuthResponse {
  @ApiProperty({ enum: ResponseTypeEnum, enumName: 'ResponseType' })
  responseType: ResponseTypeEnum;
  @ApiProperty({ type: String })
  message: string;
  @ApiProperty({ type: String })
  refreshToken?: string;
  accessToken?: string;

  @ApiProperty({ type: PartialType(Users) })
  data: Partial<Users>;
}
