import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async getAllRoom(userId: number) {
    const rooms = await this.prisma.room.findMany({ where: { user_id: userId }, include: { devices: true } });
    return rooms;
  }

  async createRoom(userId: number, roomName: string) {
    console.log(userId, roomName);
    const room = await this.prisma.room.create({
      data: {
        user_id: userId,
        room_name: roomName,
      },
    });
    return room;
  }

  async addDeviceToRoom(userId: number, deviceId: number, roomId: number) {
    const room = await this.prisma.room.update({
      where: { room_id: roomId },
      data: {
        devices: {
          connect: { device_id: deviceId },
        },
      },
    });
    return room;
  }

  async getAllUserDevice(roomId: number) {
    const devices = await this.prisma.device.findMany({ where: { room_id: roomId } });
    return devices;
  }

  async getAllDevice() {
    const devices = await this.prisma.device.findMany({});
    return devices;
  }
}
