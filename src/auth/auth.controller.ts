import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { Public } from "src/common/decorators/public.decorator";

@Public()
@Controller("auth")
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  @Get("login")
  async login(@Body() { username, password }: LoginDto) {
    if (!username || !password) throw new BadRequestException("Vui lòng điền đầy đủ thông tin!");
    const user = await this.prisma.uSER.findFirst({ where: { Username: username } });
    if (!user) throw new BadRequestException("Tên người dùng không tồn tại!");

    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) throw new BadRequestException("Mật khẩu không đúng!");

    const token = await this.authService.signToken(user.UserID, user.Email);
    return {
      message: "Đăng nhập thành công!",
      user,
      token,
    };
  }

  @Get("register")
  async register(@Body() { username, email, password }: RegisterDto) {
    if (!username || !email || !password) throw new BadRequestException("Vui lòng điền đầy đủ thông tin!");
    const existingUsername = await this.prisma.uSER.findFirst({ where: { Username: username } });
    if (existingUsername) throw new BadRequestException("Tên người dùng đã tồn tại!");

    const existingUseremail = await this.prisma.uSER.findFirst({ where: { Email: email } });
    if (existingUseremail) throw new BadRequestException("Email đã tồn tại!");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.uSER.create({
      data: {
        Username: username,
        Email: email,
        Password: hashedPassword,
      },
    });

    const token = await this.authService.signToken(newUser.UserID, newUser.Email);

    return {
      message: "Đăng ký thành công!",
      user: newUser,
      token,
    };
  }
}
