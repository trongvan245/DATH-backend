import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RoomService } from "./room.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { JwtPayLoad } from "src/common/model/jwt.payload";
import { AddDeviceDto, CreateRoomDto, GetAllUserDeviceDto } from "./dto/room.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("room")
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

  @Post("create")
  async create(@GetUser() { sub, email }: JwtPayLoad, @Body() { roomName }: CreateRoomDto) {
    const room = await this.roomService.createRoom(sub, roomName);
    return {
      room,
      message: "Create room successfully",
    };
  }

  @Post("add-device")
  async addDevice(@GetUser() { sub, email }: JwtPayLoad, @Body() { deviceId, roomId }: AddDeviceDto) {
    const rooms = await this.roomService.getAllRoom(sub);
    return {
      rooms,
      message: "Add device to room successfully",
    };
  }

  @Get("device")
  async getAllUserDevice(@GetUser() { sub, email }: JwtPayLoad, @Param() { roomId }: GetAllUserDeviceDto) {
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
