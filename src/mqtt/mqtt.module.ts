import { Module } from "@nestjs/common";
import { MqttController } from "./mqtt.controller";
import { MqttService } from "./mqtt.service";
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule],
    controllers: [MqttController],
    providers: [MqttService],
    exports: [MqttService]
})
export class MqttModule {}


