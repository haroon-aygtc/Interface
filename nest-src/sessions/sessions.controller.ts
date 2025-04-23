import { Controller, Delete, Param, UseGuards } from "@nestjs/common";
import { SessionsService } from "./sessions.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Controller("sessions")
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Delete("user/:userId")
  @UseGuards(RolesGuard)
  @Roles("admin")
  async deleteUserSessions(@Param("userId") userId: string) {
    await this.sessionsService.deleteUserSessions(userId);
    return { message: "All sessions for this user have been deleted" };
  }

  @Delete(":token")
  async deleteSession(@Param("token") token: string) {
    await this.sessionsService.deleteSessionByToken(token);
    return { message: "Session has been deleted" };
  }
}
