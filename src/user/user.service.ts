import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAllDevice(userId: number) {
        const rooms = await this.prisma.room.findMany({ where: { user_id: userId }, include: { devices: true } });
        const device = rooms.map((room) => room.devices).flat();
        return device;
    }

    async updateDeviceStatus(deviceId: number, status: string) {
        await this.prisma.device.update({
            where: { device_id: deviceId },
            data: { status: status },
        });
    }
}