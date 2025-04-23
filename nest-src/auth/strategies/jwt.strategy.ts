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
    const user = await this.usersService.findById(payload.sub);
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
