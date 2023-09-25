import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get(Logger));

  await app.listen(3000);
}
bootstrap();
