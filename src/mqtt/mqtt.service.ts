import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Server } from 'socket.io';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleDestroy {
    private readonly BROKER_URL = 'mqtt://io.adafruit.com';
    private readonly FEED_NAMES = ['LED_room_1', 'LED_room_2', 'control_room_1', 'control_room_2', 'lux_room_1', 'lux_room_2', 'hum', 'temp'];

    private mqttClient: mqtt.MqttClient;
    private io: Server;
    private currentUserId: number;
    private readonly username = 'boylangtham11';
    private readonly aioKey = 'aio_NGyt55VdiY7ztKOBnSdEJ63lnnmv';

    connect(userId: number) {  // Chuyển userId thành kiểu string vì bạn có thể sử dụng chuỗi như "boylangtham11"
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
            const [userIdFromTopic, feedId, userid, feedName] = topic.split('/');
            const numericUserId = userid;
            this.io.to(numericUserId).emit('mqtt_data', {
                feed: feedName,
                value: isNaN(+payload) ? payload : +payload,
            });
        });
    
        this.mqttClient.on('error', (err) => {
            console.error(' MQTT error:', err);
        });
    }
    private subscribeToUserFeeds(userId: number) {
        this.FEED_NAMES.forEach(feedName => {
        const topic = `${this.username}/feeds/${userId}/${feedName}`;
        this.mqttClient.subscribe(topic, (err) => {
            if (err) {
            console.error(` Failed to subscribe ${topic}`, err);
            } else {
            console.log(` Subscribed to ${topic}`);
            }
        });
        });
    }

    async publish(userId: number, feedName: string, value: string) {
        const topic = `${userId}/${feedName}`;
        this.mqttClient.publish(topic, value, {}, (err) => {
        if (err) {
            console.error(` Error publishing to ${topic}:`, err);
        } else {
            console.log(` Published to ${topic}: ${value}`);
        }
    });
    };

    async lightSet(userId: number, room: number, value: string) {
        const feed = `${userId}/LED_room_${room}`;
        await this.publish(userId,feed, value);
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
