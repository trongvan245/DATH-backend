import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
  @IsNotEmpty({ message: "Room name is required" })
  @IsString({ message: "Room name must be a string" })
  @ApiProperty({ description: "Name of the room", example: "Living Room" })
  roomName: string;
}

export class AddDeviceDto {
  @IsNotEmpty({ message: "Device ID is required" })
  @IsNumber({}, { message: "Device ID must be a number" })
  @ApiProperty({ description: "ID of the device", example: 1 })
  deviceId: number;

  @IsNotEmpty({ message: "Room ID is required" })
  @IsNumber({}, { message: "Room ID must be a number" })
  @ApiProperty({ description: "ID of the room", example: 1 })
  roomId: number;
}

export class GetAllUserDeviceDto {
  @IsNotEmpty({ message: "User ID is required" })
  @IsNumber({}, { message: "User ID must be a number" })
  @ApiProperty({ description: "ID of the room", example: 1 })
  roomId: number;
}
