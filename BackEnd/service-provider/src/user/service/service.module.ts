import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../booking/entities/booking.entity';
import { FeedBack } from '../feed-back/entities/feed-back.entity';
import { Service } from './entities/service.entity';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedBack, Booking, Service])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
