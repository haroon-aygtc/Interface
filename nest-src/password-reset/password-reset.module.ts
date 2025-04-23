import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PasswordResetController } from "./password-reset.controller";
import { PasswordResetService } from "./password-reset.service";
import { PasswordReset } from "./entities/password-reset.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([PasswordReset]), UsersModule],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
