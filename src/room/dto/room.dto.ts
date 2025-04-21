import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
  @ApiProperty({ description: "Name of the room", example: "Living Room" })
  @IsNotEmpty({ message: "Room name is required" })
  @IsString({ message: "Room name must be a string" })
  roomName: string;
}

export class AddDeviceDto {
  @ApiProperty({ description: "ID of the device", example: 1 })
  @IsNotEmpty({ message: "Device ID is required" })
  @IsNumber({}, { message: "Device ID must be a number" })
  deviceId: number;

  @ApiProperty({ description: "ID of the room", example: 1 })
  @IsNotEmpty({ message: "Room ID is required" })
  @IsNumber({}, { message: "Room ID must be a number" })
  roomId: number;
}

export class GetAllUserDeviceDto {
  @ApiProperty({ description: "ID of the room", example: 1 })
  // @IsNotEmpty({ message: "Room ID is required" })
  // @IsNumber({}, { message: "User ID must be a number" })
  roomId: number;
}

export class GetDevicePowerDto {
  @ApiProperty({ description: "ID of the device", example: 1 })
  deviceId: number;
}
