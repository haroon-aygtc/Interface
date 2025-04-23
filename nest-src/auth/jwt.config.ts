import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'secretKey',
  signOptions: {
    expiresIn: process.env.JWT_EXPIRATION || '24h',
    issuer: 'auth-api',
    audience: 'users',
  },
};
