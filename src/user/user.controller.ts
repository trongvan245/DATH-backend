import { Controller, Get } from "@nestjs/common";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { JwtPayLoad } from "src/common/model/jwt.payload";

@Controller("user")
export class UserController {
  @Get()
  getMe(@GetUser() { sub, email }: JwtPayLoad) {
    return {
      message: "Hello from user controller",
      sub,
      email,
    };
  }
}
