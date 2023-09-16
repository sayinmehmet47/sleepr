import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { UpdateReservationDto } from './reservations/dto/update-reservation.dto';
import { CreateReservationDto } from './reservations/dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, UpdateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
