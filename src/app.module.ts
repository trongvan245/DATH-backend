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
//import { WebsocketGateway } from "./websocket/websocket.gateway";
import { RoomModule } from "./room/room.module";
import { DeviceModule } from "./device/device.module";
import { WebsocketModule } from "./websocket/websocket.module";
import { PowerModuleModule } from "./power-module/power-module.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    MqttModule,
    RoomModule,
    DeviceModule,
    WebsocketModule,
    PowerModuleModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    //WebsocketGateway
  ],
})
export class AppModule {}
