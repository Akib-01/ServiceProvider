import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout } from '../checkout/entities/checkout.entity';
import { Service } from '../service/entities/service.entity';
import { UserList } from '../user-list/entities/user-list.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, UserList, Service]),
    TypeOrmModule.forFeature([Checkout]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
