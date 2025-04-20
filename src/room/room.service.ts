import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async getAllRoom(userId: number) {
    const rooms = await this.prisma.rOOM.findMany({ where: { UserID: userId }, include: { DEVICE: true } });
    return rooms;
  }

  async createRoom(userId: number, roomName: string) {
    console.log(userId, roomName);
    const room = await this.prisma.rOOM.create({
      data: {
        UserID: userId,
        Roomname: roomName,
      },
    });
    return room;
  }

  async addDeviceToRoom(userId: number, deviceId: number, roomId: number) {
    const room = await this.prisma.rOOM.update({
      where: { RoomID: roomId },
      data: {
        DEVICE: {
          connect: { DeviceID: deviceId },
        },
      },
    });
    return room;
  }

  async getAllUserDevice(roomId: number) {
    const devices = await this.prisma.dEVICE.findMany({ where: { RoomID: roomId } });
    return devices;
  }

  async getAllDevice() {
    const devices = await this.prisma.dEVICE.findMany({});
    return devices;
  }
}
