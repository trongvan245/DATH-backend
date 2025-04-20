import { Controller, Get, Param, Query } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { Public } from "src/common/decorators/public.decorator";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Mqtt")
@Public()
@Controller("mqtt")
export class MqttController {
    constructor(private readonly mqttService: MqttService) {}

    @Get('LED_room_1/on')
    async controlLightOn(@Query('userId') userId: number) {
        await this.mqttService.lightSet(userId, 1, '1'); // Bật LED_room_1
        return `Đã gửi yêu cầu bật đèn LED_room_1 cho user ${userId}`;
    }

    @Get('LED_room_1/off')
    async controlLightOff(@Query('userId') userId: number) {
        await this.mqttService.lightSet(userId, 1, '0'); // Tắt LED_room_1
        return `Đã gửi yêu cầu tắt đèn LED_room_1 cho user ${userId}`;
    }

}
