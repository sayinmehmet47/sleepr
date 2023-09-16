import { ReservationsDocument } from './reservations/models/reservation.schema';
import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationRepository extends AbstractRepository<ReservationsDocument> {
  protected readonly logger = new Logger(ReservationRepository.name);
  constructor(
    @InjectModel(ReservationsDocument.name)
    private readonly reservationModel: Model<ReservationsDocument>,
  ) {
    super(reservationModel);
  }
}
