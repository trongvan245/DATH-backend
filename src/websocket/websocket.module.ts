// src/websocket/websocket.module.ts
import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
    imports: [MqttModule],
    providers: [WebsocketGateway],
})
export class WebsocketModule {}
