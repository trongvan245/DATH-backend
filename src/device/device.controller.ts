import { Controller, Post, Body, Param } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('devices')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @Post(':userId/:deviceId')
    async controlDevice(
        @Param('userId') userId: number,
        @Param('deviceId') deviceId: number,
        @Body('state') state: 'ON' | 'OFF',
    ) {
        return this.deviceService.controlDevice(userId, deviceId, state);
    }
}
