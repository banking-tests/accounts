// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";

import { AppModule } from "@/app/app.module";
import { JsonLoggerService } from "@/core/infrastructure/logger/json.logger";
import { HttpServerConfiguration } from "@/core/infrastructure/types";
import { AntiThrottleConfiguration } from "./core/infrastructure/types/http/throttles.type";

async function bootstrap() {
  const logger = JsonLoggerService.getInstance();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
    snapshot: true,
  });
  const configService: ConfigService = app.get(ConfigService);
  const config = configService.get<HttpServerConfiguration>("server");
  const antiThrottle =
    configService.get<AntiThrottleConfiguration>("antiThrottle");

  const { host, port } = config;

  app.set("trust proxy", 1);
  app.enableVersioning();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  app.use(helmet());

  app.use(
    expressRateLimit({
      windowMs: antiThrottle.interval,
      max: antiThrottle.maxRequest,
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => {
        if (!req.ip) {
          console.error("Warning: request.ip is missing!");
          return req.socket.remoteAddress;
        }

        return req.ip.replace(/:\d+[^:]*$/, "");
      },
    })
  );

  const documentBuilder = new DocumentBuilder()
    .setTitle("API Docs")
    .setDescription("API Reference")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup("docs", app, document);

  app.listen(port, host, () => {
    Logger.log(`Server ready on http://${host}:${port}`, "Application");
  });
}

bootstrap();
