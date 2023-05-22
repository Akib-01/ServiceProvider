import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payment/entities/payment.entity';
import { Report } from '../report/entities/report.entity';
import { Service } from '../service/entities/service.entity';
import { UserList } from '../user-list/entities/user-list.entity';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { Checkout } from './entities/checkout.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Report, Checkout]),
    TypeOrmModule.forFeature([UserList]),
    TypeOrmModule.forFeature([Service]),
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
