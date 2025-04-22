// src/websocket/websocket.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket
    } from '@nestjs/websockets';
    import { Server, Socket } from 'socket.io';
    import { Injectable } from '@nestjs/common';
    import { MqttService } from '../mqtt/mqtt.service';
    
    @WebSocketGateway({
        cors: {
        origin: '*',
        },
    })
    @Injectable()
    export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
        @WebSocketServer()
        server: Server;
    
        constructor(private readonly mqttService: MqttService) {}
    
        afterInit(server: Server) {
        console.log('WebSocket Gateway khởi động');
        this.mqttService.setSocketServer(server);
        }
    
        handleConnection(client: Socket) {
        console.log(` Client kết nối: ${client.id}`);
        }
    
        handleDisconnect(client: Socket) {
        console.log(` Client ngắt kết nối: ${client.id}`);
        }
    
        @SubscribeMessage('register')
        handleRegister(@MessageBody() data: { userId: number }, @ConnectedSocket() client: Socket) {
        const userId = data.userId;
        console.log(` Client ${client.id} đăng ký với userId: ${userId}`);
    
        // Gán client vào room theo userId
        client.join(userId.toString());
    
        // Kết nối MQTT nếu chưa kết nối
        //this.mqttService.connect(userId);
        }
    }
