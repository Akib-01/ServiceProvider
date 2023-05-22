import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../service/entities/service.entity';
import { UserList } from '../user-list/entities/user-list.entity';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Checkout } from './entities/checkout.entity';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Checkout)
    private readonly checkoutRepo: Repository<Checkout>,
    @InjectRepository(UserList)
    private readonly userRepo: Repository<UserList>,
    @InjectRepository(Service)
    private readonly ServiceRepo: Repository<Service>,
  ) {}
  async create(createCheckoutDto: CreateCheckoutDto): Promise<Checkout> {
    const { userListId, serviceId, ...checkoutData } = createCheckoutDto;
    const user = await this.userRepo.findOne({ where: { id: userListId } });
    const service = await this.ServiceRepo.findOne({
      where: { id: serviceId },
    });
    const checkout = new Checkout();
    checkout.id = checkoutData.id;
    checkout.destination = checkoutData.destination;
    checkout.time = checkoutData.time;
    checkout.paymentType = checkoutData.paymentType;
    checkout.paymentPrice = checkoutData.paymentPrice;
    checkout.UserList = user;
    checkout.Service = service;

    return await this.checkoutRepo.save(checkout);
  }

  findAll(): Promise<Checkout[]> {
    return this.checkoutRepo.find({
      relations: ['UserList', 'Service'],
    });
  }

  findOne(id: number) {
    return this.checkoutRepo.findOneBy({ id });
  }

  async update(
    id: number,
    updateCheckoutDto: CreateCheckoutDto,
  ): Promise<Checkout> {
    const {
      destination,
      paymentPrice,
      paymentType,
      time,
      userListId,
      serviceId,
    } = updateCheckoutDto;

    const booking = await this.userRepo.findOne({
      where: { id: userListId },
    });
    const service = await this.ServiceRepo.findOne({
      where: { id: serviceId },
    });

    const checkout = await this.checkoutRepo.findOne({
      where: { id },
      relations: ['UserList', 'Service'],
    });

    checkout.destination = destination;
    checkout.time = time;
    checkout.UserList = booking;
    checkout.Service = service;
    checkout.paymentPrice = paymentPrice;
    checkout.paymentType = paymentType;

    return await this.checkoutRepo.save(checkout);
  }

  remove(id: number) {
    return this.checkoutRepo.delete(id);
  }
  async findLatestCheckout(): Promise<Checkout> {
    const latest = await this.checkoutRepo.findOne({
      where: {},
      order: { id: 'DESC' },
    });
    return latest;
  }
}
