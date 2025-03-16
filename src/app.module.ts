import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./auth/guard/jwt.guard";

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
