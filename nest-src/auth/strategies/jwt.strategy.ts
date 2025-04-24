import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../../users/users.service";
import { jwtConfig } from "../jwt.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
      issuer: jwtConfig.signOptions?.issuer,
      audience: jwtConfig.signOptions?.audience,
    });
  }

  async validate(payload: any) {
    // Verify that the user exists in the database
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      return null; // User not found, authentication will fail
    }

    // Return the user object with necessary information
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      name: user.name,
      emailVerified: user.emailVerified
    };
  }
}
