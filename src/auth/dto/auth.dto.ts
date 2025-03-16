import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "trongvan245",
  })
  @IsNotEmpty({ message: "Username is required" })
  @IsString({ message: "Username must be a string" })
  username: string;

  @ApiProperty({
    example: "123456",
  })
  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  password: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Username is required" })
  @IsString({ message: "Username must be a string" })
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
