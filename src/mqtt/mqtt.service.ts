import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
    private readonly ADAFRUIT_IO_USERNAME = 'huyntpntp';
    private readonly ADAFRUIT_IO_KEY = 'aio_EgtO71Sp7rCfColYyhcozAsu2fE8'; // Thay bằng key thật
    private readonly BROKER_URL = 'mqtt://io.adafruit.com';

    private readonly FEEDS = [
        'light1', 'light1_brightness'
    ];

    private mqttClient: mqtt.MqttClient;
    private io: Server;

    constructor() {}

    onModuleInit() {
        console.log('🚀 AdafruitMqttService đã khởi động');
        this.connectMqtt();
    }

    private connectMqtt() {
        this.mqttClient = mqtt.connect(this.BROKER_URL, {
        username: this.ADAFRUIT_IO_USERNAME,
        password: this.ADAFRUIT_IO_KEY,
        });

        this.mqttClient.on('connect', () => {
        console.log('✅ Kết nối Adafruit MQTT thành công!');
        this.subscribeToFeeds();
        });

        this.mqttClient.on('message', (topic, message) => {
        const payload = message.toString();
        console.log(`📥 Nhận dữ liệu từ ${topic}: ${payload}`);
        if (this.io) {
            this.io.emit('mqtt_data', { topic, payload });
        }
        });

        this.mqttClient.on('error', (err) => {
        console.error('❌ Lỗi kết nối MQTT:', err);
        });
    }

    private subscribeToFeeds() {
        this.FEEDS.forEach(feed => {
        const topic = `${this.ADAFRUIT_IO_USERNAME}/feeds/${feed}`;
        this.mqttClient.subscribe(topic, (err) => {
            if (err) {
            console.error(`❌ Không thể subscribe ${topic}:`, err);
            } else {
            console.log(`📡 Đã subscribe: ${topic}`);
            }
        });
        });
    }

    async publish(feed: string, value: string) {
        const topic = `${this.ADAFRUIT_IO_USERNAME}/feeds/${feed}`;
        this.mqttClient.publish(topic, value, {}, (err) => {
        if (err) {
            console.error(`❌ Lỗi gửi dữ liệu đến ${topic}:`, err);
        } else {
            console.log(`📤 Gửi dữ liệu đến ${topic}: ${value}`);
        }
        });
    }

    async lightSet(value: string) {
        await this.publish('light1', value);
    }


    async lightBright(value: string) {
        await this.publish('light1_brightness', value);
        await this.publish('light1', value==='0'?'0':'1');
    }


    onModuleDestroy() {
        console.log('❌ Đóng kết nối MQTT');
        this.mqttClient.end();
    }

    setSocketServer(io: Server) {
        this.io = io;
    }
}
