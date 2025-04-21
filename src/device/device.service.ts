import { Injectable } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';

@Injectable()
export class DeviceService {
    constructor(private readonly mqttService: MqttService) {}

    async controlDevice(userId: number,deviceId: number, state: 'ON' | 'OFF') {

        await this.mqttService.publish(userId, deviceId, state);

        return { message: `Device ${deviceId} for user ${userId} set to ${state}` };
    }
}
