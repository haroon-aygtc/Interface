import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { RequestWithUser } from "../common/types/fastify.types";
import { EmailVerificationService } from "./email-verification.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("email-verification")
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Get(":token")
  async verifyEmail(@Param("token") token: string) {
    const user = await this.emailVerificationService.verifyEmail(token);
    return {
      message: "Email verified successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post("resend")
  async resendVerificationEmail(@Request() req: RequestWithUser) {
    const verification = await this.emailVerificationService.resendVerificationEmail(
      req.user.id,
    );

    // In a real implementation, we would send an email with the verification link
    return {
      message: "Verification email sent successfully",
      // Only return the token in development for testing
      token: process.env.NODE_ENV !== "production" ? verification.token : undefined,
    };
  }
}
