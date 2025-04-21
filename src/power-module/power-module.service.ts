import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { PrismaService } from "src/prisma/prisma.service";

interface WeeklyConsumption {
  sunday: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
}

@Injectable()
export class PowerModuleService {
  private readonly logger = new Logger(PowerModuleService.name);

  constructor(private prisma: PrismaService) {}

  @Interval(5000) // Run every 1000 ms (1 second)
  async updatePowerConsumption() {
    this.logger.debug("Updating power consumption for devices...");
    try {
      // Get all devices with "On" status
      const onDevices = await this.prisma.device.findMany({
        where: {
          status: "On",
        },
      });

      // Update each device that is on
      for (const device of onDevices) {
        // Generate random power consumption between 2.5 and 3.0
        const powerIncrement = Math.random() * 0.5 + 0.5; // Random value between 0.5 and 1.0

        // Initialize or parse weekly consumption
        let weeklyConsumption = {
          sunday: 0,
          monday: device.monday,
          tuesday: device.tuesday,
          wednesday: device.wednesday,
          thursday: 0,
          friday: 0,
          saturday: 0,
        };

        if (device.status === "On") {
          weeklyConsumption.wednesday += powerIncrement;
        }
        // Update the device
        await this.prisma.device.update({
          where: {
            device_id: device.device_id,
          },
          data: {
            wednesday: weeklyConsumption.wednesday,
          },
        });

        this.logger.debug(`Device ${device.device_id}: +${powerIncrement.toFixed(2)} Wh for Wednesday`);
      }
    } catch (error) {
      this.logger.error(`Error updating power consumption: ${error.message}`);
    }
  }
}
