import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, LessThan } from "typeorm";
import { TokenBlacklist } from "./entities/token-blacklist.entity";

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectRepository(TokenBlacklist)
    private tokenBlacklistRepository: Repository<TokenBlacklist>,
  ) {}

  async add(token: string, expiresAt: Date): Promise<TokenBlacklist> {
    const blacklistedToken = this.tokenBlacklistRepository.create({
      token,
      expiresAt,
    });

    return this.tokenBlacklistRepository.save(blacklistedToken);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.tokenBlacklistRepository.findOne({
      where: { token },
    });

    return !!blacklistedToken;
  }

  async removeExpired(): Promise<void> {
    await this.tokenBlacklistRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }
}
