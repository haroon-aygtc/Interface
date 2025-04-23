import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Session } from "./entities/session.entity";

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  async createSession(userId: string): Promise<Session> {
    const token = `token-${userId}-${Date.now()}-${uuidv4()}`;
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now

    const session = this.sessionsRepository.create({
      userId,
      token,
      expiresAt,
    });

    return this.sessionsRepository.save(session);
  }

  async findSessionByToken(token: string): Promise<Session | null> {
    return this.sessionsRepository.findOne({
      where: { token },
    });
  }

  async deleteUserSessions(userId: string): Promise<void> {
    await this.sessionsRepository.delete({ userId });
  }

  async deleteSessionByToken(token: string): Promise<void> {
    await this.sessionsRepository.delete({ token });
  }
}
