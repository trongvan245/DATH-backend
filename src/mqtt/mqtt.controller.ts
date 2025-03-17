import { Controller, Get, Param } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { Public } from "src/common/decorators/public.decorator";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Mqtt")
@Public()
@Controller("mqtt")
export class MqttController {
    constructor(private readonly mqttService: MqttService) {}

    @Get("light1/on")
    async controlLight() {
        await this.mqttService.lightSet('1');
        return `🟢 Đã gửi yêu cầu bật/tắt đèn: bật`;
    }

    @Get('light1/off')
    async controlLightOff() {
        await this.mqttService.lightSet('0');
        return `Đã gửi yêu cầu bật/tắt đèn: tắt`;
    }

    @Get('light1_brightness/:value')
    async controlFan(@Param('value') value: string) {
        await this.mqttService.lightBright(value);
        return `Đã gửi yêu cầu chỉnh độ sáng đèn: ${value}`;
    }

}
