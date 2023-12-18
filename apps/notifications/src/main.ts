import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RABBITMQ_URL')],
      queue: 'notifications',
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();

  const port = configService.get('PORT');
  app.get(Logger).log(`Payments microservice is listening on port ${port}`);
}
bootstrap();
