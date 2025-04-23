import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FastifyRequest } from "fastify";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<FastifyRequest & { user?: { role: string } }>();

    // If no user is present in the request, deny access
    if (!user) {
      return false;
    }

    // Admin role has access to everything
    if (user.role === "admin") {
      return true;
    }

    // Check if user's role matches any of the required roles
    return requiredRoles.some((role) => user.role === role);
  }
}
