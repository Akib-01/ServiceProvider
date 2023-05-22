import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingStatusDto } from '../booking_status/dto/create-booking_status.dto';
import { BookingStatus } from '../booking_status/entities/booking_status.entity';

@Injectable()
export class ManageOrderService {
  constructor(
    @InjectRepository(BookingStatus)
    private BookingStatusRepo: Repository<BookingStatus>,
  ) {}

  findOrder() {
    return this.BookingStatusRepo.find();
  }

  findOneOrder(id: number) {
    return this.BookingStatusRepo.findOneBy({ id });
  }

  updateOrder(id: number, Dto: CreateBookingStatusDto) {
    return this.BookingStatusRepo.update(id, Dto);
  }

  removeOrder(id: number) {
    return this.BookingStatusRepo.delete(id);
  }
}
