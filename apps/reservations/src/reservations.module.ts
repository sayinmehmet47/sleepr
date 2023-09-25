import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common';
import { ReservationRepository } from './reservations.repository';
import {
  ReservationsDocument,
  ReservationsSchema,
} from './reservations/models';
import { LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common/constants/services';
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationsDocument.name, schema: ReservationsSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: 'auth',
            port: 3002,
          },
        }),
        inject: [ConfigService],
      },
    ]),

    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
