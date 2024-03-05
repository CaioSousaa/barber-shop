import { NextFunction, Request, Response } from 'express';
import { secret } from 'src/config/jtw/config.jwt';
import { verify } from 'jsonwebtoken';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
  name: string;
  email: string;
}

export function EnsureAuthenticateMidllwware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedException('JWT token is missing');
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, secret);

    const { id, email, name } = decoded as ITokenPayload;

    req.user = { id, email, name };

    return next();
  } catch {
    throw new HttpException('Invalid JWT Token', HttpStatus.UNAUTHORIZED);
  }
}
