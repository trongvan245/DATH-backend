import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Server } from 'socket.io';
import * as mqtt from 'mqtt';
import { UserService } from '../user/user.service';
@Injectable()
export class MqttService implements OnModuleDestroy {
    private readonly BROKER_URL = 'mqtt://io.adafruit.com';

    private mqttClient: mqtt.MqttClient;
    private io: Server;
    private currentUserId: number;
    private readonly username = 'boylangtham11';
    private readonly aioKey = process.env.ADAFRUIT_IO_KEY || "";
    constructor(private readonly userService: UserService) {}
    connect(userId: number) {  
        this.currentUserId = userId;
    
        this.mqttClient = mqtt.connect(this.BROKER_URL, {
            username: this.username,
            password: this.aioKey,
        });
    
        this.mqttClient.on('connect', () => {
            console.log(` MQTT connected to Adafruit for user ${userId}`);
            this.subscribeToUserFeeds(userId);
        });
    
        this.mqttClient.on('message', (topic, message) => {
            const payload = message.toString();
            console.log(`Nhận dữ liệu từ ${topic}: ${payload}`);
            const parts = topic.split('/');
            const userAndDevice = parts[2]; 
        
            const [userId, deviceId] = userAndDevice.split('_');
            this.io.to(userId).emit('mqtt_data', {
                deviceId: deviceId,
                value: isNaN(+payload) ? payload : +payload,
            });
        });
    
        this.mqttClient.on('error', (err) => {
            console.error(' MQTT error:', err);
        });
    }
    private async subscribeToUserFeeds(userId: number) {
        const devices = await this.userService.getAllDevice(userId);
        for (const device of devices) {
        const topic = `${this.username}/feeds/${userId}_${device.device_id}`;
        this.mqttClient.subscribe(topic, (err) => {
            if (err) {
            console.error(`❌ Failed to subscribe ${topic}`, err);
            } else {
            console.log(`✅ Subscribed to ${topic}`);
            }
        });
        }
    }

    async publish(userId: number, deviceId: number, value: string) {
        const topic = `${this.username}/feeds/${userId}_${deviceId}`;
        this.mqttClient.publish(topic, value, {}, (err) => {
        if (err) {
            console.error(` Error publishing to ${topic}:`, err);
        } else {
            console.log(` Published to ${topic}: ${value}`);
        }
    });
    };

    async lightSet(userId: number, deviceId: number, value: string) {
        await this.publish(userId,deviceId, value);
    }

    setSocketServer(io: Server) {
        this.io = io;
        console.log(' WebSocket server set in MqttService');
    }

    onModuleDestroy() {
        if (this.mqttClient) {
        console.log(' MQTT connection closed');
        this.mqttClient.end();
        }
    }
}
