import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from 'src/user/user-list/session.guard';
import { BookingStatusService } from './booking_status.service';
import { CreateBookingStatusDto } from './dto/create-booking_status.dto';
@UseGuards(new SessionGuard())
@Controller('booking-status')
export class BookingStatusController {
  constructor(private readonly bookingStatusService: BookingStatusService) {}

  @Post('/insert')
  create(@Body() createBookingStatusDto: CreateBookingStatusDto) {
    return this.bookingStatusService.create(createBookingStatusDto);
  }

  @Get('/get')
  findAll() {
    return this.bookingStatusService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.bookingStatusService.findOne(+id);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() createBookingStatusDto: CreateBookingStatusDto,
  ) {
    return this.bookingStatusService.update(+id, createBookingStatusDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.bookingStatusService.remove(+id);
  }
}
