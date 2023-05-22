import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerList } from '../manager_list/entities/manager_list.entity';
import { BookingStatusController } from './booking_status.controller';
import { BookingStatusService } from './booking_status.service';
import { BookingStatus } from './entities/booking_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerList, BookingStatus])],
  controllers: [BookingStatusController],
  providers: [BookingStatusService],
})
export class BookingStatusModule {}
