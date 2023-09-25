import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host: '0.0.0.0',
      port: 3002,
    },
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
