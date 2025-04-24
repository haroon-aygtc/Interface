import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import { PasswordReset } from "./entities/password-reset.entity";
import { UsersService } from "../users/users.service";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordReset)
    private passwordResetRepository: Repository<PasswordReset>,
    private usersService: UsersService,
  ) {}

  async createPasswordReset(userId: string): Promise<PasswordReset> {
    const token = `reset-${uuidv4()}`;
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now

    const passwordReset = this.passwordResetRepository.create({
      userId,
      token,
      expiresAt,
      used: false,
    });

    return this.passwordResetRepository.save(passwordReset);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { email } = forgotPasswordDto;

    // Find user by email
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      // Don't reveal that the email doesn't exist for security reasons
      return;
    }

    // Create a password reset token
    const passwordReset = await this.createPasswordReset(user.id);

    // In a real implementation, we would send an email with the reset link
    console.log(
      `Password reset requested for ${email}. Token: ${passwordReset.token}`,
    );
    // Email logic to send the reset link can be added here
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { token, password } = resetPasswordDto;

    // Find the reset token
    const passwordReset = await this.passwordResetRepository.findOne({
      where: { token, used: false },
    });

    if (!passwordReset) {
      throw new BadRequestException("Invalid or expired token");
    }

    // Check if token is expired
    if (new Date(passwordReset.expiresAt) < new Date()) {
      throw new BadRequestException("Token has expired");
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the user's password
    await this.usersService.update(passwordReset.userId, {
      password: hashedPassword,
    });

    // Mark the token as used
    passwordReset.used = true;
    await this.passwordResetRepository.save(passwordReset);
  }
}
