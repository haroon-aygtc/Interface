import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { EmailVerificationService } from "../users/email-verification.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RefreshToken } from "./entities/refresh-token.entity";
import { TokenBlacklistService } from "./token-blacklist.service";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenBlacklistService: TokenBlacklistService,
    private emailVerificationService: EmailVerificationService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // In a real implementation, we would verify the password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    // Generate access token
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    // Generate refresh token
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      user,
      token: accessToken,
      refreshToken: refreshToken.token,
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException("Email already in use");
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // Create new user
    const user = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: "user", // Default role for new users
      emailVerified: false, // Email needs verification
    });

    // Create email verification token
    const verification = await this.emailVerificationService.createVerificationToken(user.id);

    // In a real implementation, we would send an email with the verification link
    console.log(`Verification email for ${user.email}. Token: ${verification.token}`);

    // Generate access token
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    // Generate refresh token
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      user,
      token: accessToken,
      refreshToken: refreshToken.token,
    };
  }

  async logout(userId: string): Promise<void> {
    // Revoke all refresh tokens for the user
    const refreshTokens = await this.refreshTokenRepository.find({
      where: { userId, revoked: false }
    });

    for (const token of refreshTokens) {
      token.revoked = true;
      token.revokedAt = new Date();
      await this.refreshTokenRepository.save(token);
    }

    // Get the current token from the request and add it to the blacklist
    // This is handled in the JwtAuthGuard

    return;
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    // Find the refresh token
    const tokenEntity = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken, revoked: false }
    });

    if (!tokenEntity) {
      throw new BadRequestException('Invalid refresh token');
    }

    // Check if token is expired
    if (new Date(tokenEntity.expiresAt) < new Date()) {
      throw new BadRequestException('Refresh token expired');
    }

    // Get the user
    const user = await this.usersService.findById(tokenEntity.userId);

    // Revoke the current refresh token
    tokenEntity.revoked = true;
    tokenEntity.revokedAt = new Date();
    await this.refreshTokenRepository.save(tokenEntity);

    // Generate new tokens
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    const newRefreshToken = await this.generateRefreshToken(user.id);

    return {
      user,
      token: accessToken,
      refreshToken: newRefreshToken.token,
    };
  }

  private async generateRefreshToken(userId: string): Promise<RefreshToken> {
    const token = `refresh-${uuidv4()}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    const refreshToken = this.refreshTokenRepository.create({
      userId,
      token,
      expiresAt,
      revoked: false,
    });

    return this.refreshTokenRepository.save(refreshToken);
  }
}
