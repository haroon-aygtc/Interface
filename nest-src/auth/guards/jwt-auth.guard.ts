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
    try {
      // Extract the JWT from the request
      const request = context.switchToHttp().getRequest<FastifyRequest>();
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

      // If no token is provided, throw an unauthorized exception
      if (!token) {
        throw new UnauthorizedException('No authentication token provided');
      }

      // Check if the token is blacklisted
      const isBlacklisted = await this.tokenBlacklistService.isBlacklisted(token);
      if (isBlacklisted) {
        throw new UnauthorizedException('Token has been revoked');
      }

      // Continue with the default JWT authentication
      const result = await super.canActivate(context) as boolean;

      // If authentication failed, throw an unauthorized exception
      if (!result) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      return result;
    } catch (error) {
      // Handle any errors that occur during authentication
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
