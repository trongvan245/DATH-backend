import { Module } from "@nestjs/common";
import { PowerModuleService } from "./power-module.service";
import { PowerModuleController } from "./power-module.controller";

@Module({
  providers: [PowerModuleService],
  controllers: [PowerModuleController],
})
export class PowerModuleModule {}
