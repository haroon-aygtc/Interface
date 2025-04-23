import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { EmailVerification } from "./entities/email-verification.entity";
import { User } from "./entities/user.entity";

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectRepository(EmailVerification)
    private emailVerificationRepository: Repository<EmailVerification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createVerificationToken(userId: string): Promise<EmailVerification> {
    const token = `verify-${uuidv4()}`;
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now

    const verification = this.emailVerificationRepository.create({
      userId,
      token,
      expiresAt,
      used: false,
    });

    return this.emailVerificationRepository.save(verification);
  }

  async verifyEmail(token: string): Promise<User> {
    // Find the verification token
    const verification = await this.emailVerificationRepository.findOne({
      where: { token, used: false },
    });

    if (!verification) {
      throw new BadRequestException("Invalid or expired verification token");
    }

    // Check if token is expired
    if (new Date(verification.expiresAt) < new Date()) {
      throw new BadRequestException("Verification token has expired");
    }

    // Find the user
    const user = await this.userRepository.findOne({
      where: { id: verification.userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Update the user's email verification status
    user.emailVerified = true;
    await this.userRepository.save(user);

    // Mark the token as used
    verification.used = true;
    await this.emailVerificationRepository.save(verification);

    return user;
  }

  async resendVerificationEmail(userId: string): Promise<EmailVerification> {
    // Find the user
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.emailVerified) {
      throw new BadRequestException("Email is already verified");
    }

    // Invalidate any existing tokens
    const existingTokens = await this.emailVerificationRepository.find({
      where: { userId, used: false },
    });

    for (const token of existingTokens) {
      token.used = true;
      await this.emailVerificationRepository.save(token);
    }

    // Create a new verification token
    return this.createVerificationToken(userId);
  }
}
