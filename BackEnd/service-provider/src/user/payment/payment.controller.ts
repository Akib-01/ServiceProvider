import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  //@UsePipes(new ValidationPipe())
  @Post('/insert')
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }
  //@UsePipes(new ValidationPipe())
  @Get('/get')
  findAll() {
    return this.paymentService.findAll();
  }
  //@UsePipes(new ValidationPipe())
  @Get('/get/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.paymentService.findOne(+id);
  }
  //@UsePipes(new ValidationPipe())
  @Put('/update/:id')
  update(@Param('id', ParseIntPipe) id: string, @Body() Dto: CreatePaymentDto) {
    return this.paymentService.update(+id, Dto);
  }
  //@UsePipes(new ValidationPipe())
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.paymentService.remove(+id);
  }
}
