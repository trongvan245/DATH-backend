import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MqttModule } from "./mqtt/mqtt.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./auth/guard/jwt.guard";
import { MqttService } from "./mqtt/mqtt.service";
import { MqttController } from "./mqtt/mqtt.controller";
import { WebsocketModule } from "./websocket/websocket.module";
@Module({
  imports: [
    PrismaModule, AuthModule, UserModule, MqttModule,WebsocketModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    }
    //WebsocketGateway
  ],
})
export class AppModule {}
