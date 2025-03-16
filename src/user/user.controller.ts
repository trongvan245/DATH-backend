import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { JwtPayLoad } from "src/common/model/jwt.payload";

@ApiTags("User")
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
