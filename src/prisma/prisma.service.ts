import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: "mysql://avnadmin:AVNS_NjACD_NE62GeWzfUfmt@mysql-71799ca-databases-used-in-university.d.aivencloud.com:13019/DADN-HK242"
        },
      },
    });
  }
}
