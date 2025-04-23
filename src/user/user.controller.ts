import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { JwtPayLoad } from "src/common/model/jwt.payload";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("user")
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getMe(@GetUser() { sub, email }: JwtPayLoad) {
    return {
      message: "Hello from user controller",
      sub,
      email,
    };
  }

  @Get("device")
  async getAllDevice(@GetUser() { sub, email }: JwtPayLoad) {
    const devices = await this.userService.getAllDevice(sub);
    return {
      devices,
      message: "Get all devices successfully",
    };
  }
}
