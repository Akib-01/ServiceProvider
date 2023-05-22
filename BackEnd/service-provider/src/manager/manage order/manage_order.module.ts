import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingStatus } from '../booking_status/entities/booking_status.entity';
import { ManageOrderController } from './manage_order.controller';
import { ManageOrderService } from './manage_order.service';


@Module({
  imports: [TypeOrmModule.forFeature([BookingStatus])],
  controllers: [ManageOrderController],
  providers: [ManageOrderService]
})
export class ManageOrderModule {}
