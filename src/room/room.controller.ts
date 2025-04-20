import { Controller, Get, Post } from "@nestjs/common";
import { RoomService } from "./room.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { JwtPayLoad } from "src/common/model/jwt.payload";
import { AddDeviceDto, CreateRoomDto, GetAllUserDeviceDto } from "./dto/room.dto";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@Controller("room")
@ApiBearerAuth()
export class RoomController {
  constructor(private roomService: RoomService) {}
  @Get()
  async getAll(@GetUser() { sub, email }: JwtPayLoad) {
    const rooms = await this.roomService.getAllRoom(sub);
    return {
      rooms,
      message: "Get all rooms successfully",
    };
  }

  @ApiOperation({ summary: "Create room" })
  @Post("create")
  async create(@GetUser() { sub, email }: JwtPayLoad, { roomName }: CreateRoomDto) {
    const room = await this.roomService.createRoom(sub, roomName);
    const rooms = await this.roomService.getAllRoom(sub);
    return {
      rooms,
      message: "Create room successfully",
    };
  }

  @Post("add-device")
  async addDevice(@GetUser() { sub, email }: JwtPayLoad, { deviceId, roomId }: AddDeviceDto) {
    const room = await this.roomService.addDeviceToRoom(sub, deviceId, roomId);
    const rooms = await this.roomService.getAllRoom(sub);
    return {
      rooms,
      message: "Add device to room successfully",
    };
  }

  @Get("device")
  async getAllUserDevice(@GetUser() { sub, email }: JwtPayLoad, { roomId }: GetAllUserDeviceDto) {
    const devices = await this.roomService.getAllUserDevice(roomId);
    return {
      devices,
      message: "Get all devices successfully",
    };
  }

  @Get("all-device")
  async getAllDevice(@GetUser() { sub, email }: JwtPayLoad) {
    const devices = await this.roomService.getAllDevice();
    return {
      devices,
      message: "Get all devices successfully",
    };
  }
}
