import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { PasswordResetService } from "./password-reset.service";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Controller("password-reset")
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post("forgot")
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.passwordResetService.forgotPassword(forgotPasswordDto);
    return {
      message:
        "If your email is registered, you will receive a password reset link",
    };
  }

  @Post("reset")
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.passwordResetService.resetPassword(resetPasswordDto);
    return { message: "Password has been reset successfully" };
  }
}
