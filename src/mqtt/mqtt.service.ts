import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import * as mqtt from 'mqtt';
import { UserService } from '../user/user.service';
@Injectable()
export class MqttService implements OnModuleDestroy, OnModuleInit  {
    private readonly BROKER_URL = 'mqtt://io.adafruit.com';

    private mqttClient: mqtt.MqttClient;
    private io: Server;
    private currentUserId: number;
    private readonly username = 'boylangtham11';
    private readonly aioKey = process.env.AIO_KEY || '';
    constructor(private readonly userService: UserService) {}
    async onModuleInit() {
        this.mqttClient = mqtt.connect(this.BROKER_URL, {
            username: this.username,
            password: this.aioKey,
        });

        this.mqttClient.on('connect', async () => {
            console.log(' MQTT connected to Adafruit');
            await this.subscribeToUserFeeds(3);
        });

        this.mqttClient.on('message', (topic, message) => {
            const payload = message.toString();
            console.log(` Nhận dữ liệu từ ${topic}: ${payload}`);

            const parts = topic.split('/');
            const userAndDevice = parts[2]; 
            const [userId, deviceId] = userAndDevice.split('_');
            
            this.io?.to(userId).emit('mqtt_data', {
                deviceId,
                value: isNaN(+payload) ? payload : +payload,
            });
            if (deviceId == "1" || deviceId == "2") {
                const normalized = payload.trim().toUpperCase();
                const status = (normalized === "ON") ? 'ON' : 'OFF';
        
                // Gọi cập nhật status
                this.userService.updateDeviceStatus(Number(deviceId), "OFF");

                
            }
        });

        

        this.mqttClient.on('error', (err) => {
            console.error('MQTT error:', err);
        });
    }

    private async subscribeToUserFeeds(userId: number) {
        const devices = await this.userService.getAllDevice(userId);
        for (const device of devices) {
        const topic = `${this.username}/feeds/${userId}_${device.device_id}`;
        this.mqttClient.subscribe(topic, (err) => {
            if (err) {
            console.error(`Failed to subscribe ${topic}`, err);
            } else {
            console.log(`Subscribed to ${topic}`);
            }
        });
        }
    }

    async publish(userId: number, deviceId: number, value: string) {
        const topic = `${this.username}/feeds/${userId}_control_${deviceId}`;
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
