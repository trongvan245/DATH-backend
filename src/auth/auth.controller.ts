import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { Public } from "src/common/decorators/public.decorator";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Public()
@Controller("auth")
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  @Post("login")
  async login(@Body() { username, password }: LoginDto) {
    // if (!username || !password) throw new BadRequestException("Vui lòng điền đầy đủ thông tin!");
    const user = await this.prisma.user.findFirst({ where: { username: username } });
    if (!user) throw new BadRequestException("Tên người dùng không tồn tại!");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new BadRequestException("Mật khẩu không đúng!");

    console.log(user);

    const token = await this.authService.signToken(user.user_id, user.email);
    console.log(username, password, token);
    return {
      message: "Đăng nhập thành công!",
      user,
      token,
    };
  }

  @Post("register")
  async register(@Body() { username, email, password }: RegisterDto) {
    // if (!username || !email || !password) throw new BadRequestException("Vui lòng điền đầy đủ thông tin!");
    const existingUsername = await this.prisma.user.findFirst({ where: { username: username } });
    if (existingUsername) throw new BadRequestException("Tên người dùng đã tồn tại!");

    const existingUseremail = await this.prisma.user.findFirst({ where: { email: email } });
    if (existingUseremail) throw new BadRequestException("Email đã tồn tại!");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const token = await this.authService.signToken(newUser.user_id, newUser.email);

    return {
      message: "Đăng ký thành công!",
      user: newUser,
      token,
    };
  }
}
