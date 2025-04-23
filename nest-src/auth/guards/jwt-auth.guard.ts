import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TokenBlacklistService } from "../token-blacklist.service";
import { ExtractJwt } from "passport-jwt";
import { FastifyRequest } from "fastify";
import { RequestWithUser } from "../../common/types/fastify.types";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private tokenBlacklistService: TokenBlacklistService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the JWT from the request
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    // Check if the token is blacklisted
    if (token) {
      const isBlacklisted = await this.tokenBlacklistService.isBlacklisted(token);
      if (isBlacklisted) {
        throw new UnauthorizedException('Token has been revoked');
      }
    }

    // Continue with the default JWT authentication
    return super.canActivate(context) as Promise<boolean>;
  }
}
