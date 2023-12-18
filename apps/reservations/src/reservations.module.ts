import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Reservation } from './reservations/models';
import { AUTH_SERVICE, PAYMENTS_SERVICE } from '@app/common/constants/services';
import { ReservationsRepository } from './reservations.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Reservation]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().default(3001),
        PAYMENTS_HOST: Joi.string().required(),
        PAYMENTS_PORT: Joi.number().default(3003),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'auth',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'payments',
          },
        }),
        inject: [ConfigService],
      },
    ]),

    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
  exports: [ReservationsService],
})
export class ReservationsModule {}
