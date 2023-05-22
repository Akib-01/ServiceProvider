import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingStatusDto } from './dto/create-booking_status.dto';
import { BookingStatus } from './entities/booking_status.entity';

@Injectable()
export class BookingStatusService {
  constructor(
    @InjectRepository(BookingStatus)
    private BookingStatusListRepo: Repository<BookingStatus>,
  ) {}

  create(Dto: CreateBookingStatusDto) {
    return this.BookingStatusListRepo.save(Dto);
  }

  findAll() {
    return this.BookingStatusListRepo.find();
  }

  findOne(id: number) {
    return this.BookingStatusListRepo.findOneBy({ id });
  }

  update(id: number, Dto: CreateBookingStatusDto) {
    return this.BookingStatusListRepo.update(id, Dto);
  }

  remove(id: number) {
    return this.BookingStatusListRepo.delete(id);
  }
}
