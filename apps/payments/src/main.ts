import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RABBITMQ_URL')],
      queue: 'payments',
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();

  const port = configService.get('PORT');
  app.get(Logger).log(`Payments microservice is listening on port ${port}`);
}
bootstrap();
