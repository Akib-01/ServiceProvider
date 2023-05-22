import { Module } from '@nestjs/common';
import { ManagerListService } from './manager_list.service';
import { ManagerListController } from './manager_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingStatus } from '../booking_status/entities/booking_status.entity';
import { ManagerList } from './entities/manager_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingStatus, ManagerList])],
  controllers: [ManagerListController],
  providers: [ManagerListService]
})
export class ManagerListModule {}
