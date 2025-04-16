import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { JwtPayLoad } from "src/common/model/jwt.payload";

@ApiTags("User")
@Controller("user")
@ApiBearerAuth()
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
