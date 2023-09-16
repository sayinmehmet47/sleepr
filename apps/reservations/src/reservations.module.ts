import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common';
import { ReservationRepository } from './reservations.repository';
import {
  ReservationsDocument,
  ReservationsSchema,
} from './reservations/models';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationsDocument.name, schema: ReservationsSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
