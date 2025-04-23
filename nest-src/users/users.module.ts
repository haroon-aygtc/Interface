import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { EmailVerificationController } from "./email-verification.controller";
import { EmailVerificationService } from "./email-verification.service";
import { User } from "./entities/user.entity";
import { EmailVerification } from "./entities/email-verification.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, EmailVerification])],
  controllers: [UsersController, EmailVerificationController],
  providers: [UsersService, EmailVerificationService],
  exports: [UsersService, EmailVerificationService],
})
export class UsersModule {}
