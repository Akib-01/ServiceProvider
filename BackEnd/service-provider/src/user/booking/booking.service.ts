import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../service/entities/service.entity';
import { UserList } from '../user-list/entities/user-list.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookngRepo: Repository<Booking>,
    @InjectRepository(UserList)
    private readonly userRepo: Repository<UserList>,
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { id, time, userListId, serviceId } = createBookingDto;

    const user = await this.userRepo.findOne({ where: { id: userListId } });
    const service = await this.serviceRepo.findOne({
      where: { id: serviceId },
    });

    const booking = new Booking();
    booking.id = id;
    booking.time = time;
    booking.UserList = user;
    booking.Service = service;

    return await this.bookngRepo.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookngRepo.find({
      relations: ['UserList', 'Service'],
    });
  }

  findOne(id: number) {
    return this.bookngRepo.findOneBy({ id });
  }

  async update(
    id: number,
    updateBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    const { time, userListId, serviceId } = updateBookingDto;

    const user = await this.userRepo.findOne({ where: { id: userListId } });
    const service = await this.serviceRepo.findOne({
      where: { id: serviceId },
    });

    const booking = await this.bookngRepo.findOne({
      where: { id },
      relations: ['UserList', 'Service'],
    });

    booking.time = time;
    booking.UserList = user;
    booking.Service = service;

    return await this.bookngRepo.save(booking);
  }

  remove(id: number) {
    return this.bookngRepo.delete(id);
  }
  async findLatestBooking(): Promise<Booking> {
    const latestBooking = await this.bookngRepo.findOne({
      where: {},
      order: { id: 'DESC' },
    });
    return latestBooking;
  }
}
