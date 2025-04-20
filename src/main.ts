import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }));

  const config = new DocumentBuilder()
    .setTitle("Do an Da Nganh API")
    .setDescription("Do an Da Nganh API description")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT", // Optional, but helps with documentation
    })
    .setVersion("1.0")
    .addTag("Auth")
    .addTag("User")
    .addTag("room")
    .addTag("Device")
    .addTag("Mqtt")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 🔥 this is the key
    },
  });

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
