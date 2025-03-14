import { BadRequestException, Controller, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("auth")
export class AuthController {
  constructor(private prisma: PrismaService) {}
  async register(req: Request) {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password) return new BadRequestException("Vui lòng điền đầy đủ thông tin!");
      const existingUsername = await this.prisma.User.findOne({ where: { Username: username } });
      if (existingUsername) return new BadRequestException("Tên người dùng đã tồn tại!");

      const existingUseremail = await this.prisma.User.findOne({ where: { Email: email } });
      if (existingUseremail) return new BadRequestException({ message: "Email đã tồn tại!" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prisma.User.create({
        Username: username,
        Email: email,
        Password: hashedPassword,
      });

      return {
        message: "Đăng ký thành công!",
        user: newUser,
      };
    } catch (err) {
      return new InternalServerErrorException({ message: "Lỗi server!", error: err.message });
    }
  }
}
