import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';

import { Checkout } from '../checkout/entities/checkout.entity';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private PaymentRepo: Repository<Payment>,
    @InjectRepository(Checkout)
    private readonly checkoutRepo: Repository<Checkout>,
  ) {}
  async create(dto: CreatePaymentDto): Promise<Payment> {
    const { CheckoutId, ...paymentdata } = dto;
    const checkout = await this.checkoutRepo.findOne({
      where: { id: CheckoutId },
    });
    const payment = new Payment();
    payment.paymentInfo = paymentdata.paymentInfo;
    payment.paymentType = paymentdata.paymentType;
    payment.Checkout = checkout;

    return await this.PaymentRepo.save(payment);
  }

  async findAll() {
    return await this.PaymentRepo.find({ relations: ['Checkout'] });
  }

  async findOne(id: number) {
    return await this.PaymentRepo.findOneBy({ id });
  }

  async update(id: number, dto: CreatePaymentDto): Promise<Payment> {
    const { CheckoutId, ...paymentData } = dto;

    const checkout = await this.checkoutRepo.findOne({
      where: { id: CheckoutId },
    });

    const payment = await this.PaymentRepo.findOne({
      where: { id },
      relations: ['Checkout'],
    });

    payment.paymentInfo = paymentData.paymentInfo;
    payment.paymentType = paymentData.paymentType;
    payment.Checkout = checkout;

    return await this.PaymentRepo.save(payment);
  }

  async remove(id: number) {
    return await this.PaymentRepo.delete(id);
  }
}
