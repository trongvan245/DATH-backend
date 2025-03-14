import { Module } from "@nestjs/common";
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
})
export class AppModule {}
