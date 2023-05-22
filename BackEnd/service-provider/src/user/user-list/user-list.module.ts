import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../booking/entities/booking.entity';
import { UserList } from './entities/user-list.entity';
import { UserListController } from './user-list.controller';
import { UserListService } from './user-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, UserList])],
  controllers: [UserListController],
  providers: [UserListService],
})
export class UserListModule {}
