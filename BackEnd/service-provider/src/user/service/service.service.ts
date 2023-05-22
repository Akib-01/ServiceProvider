import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private ServiceRepo: Repository<Service>,
  ) {}
  create(Dto: CreateServiceDto) {
    return this.ServiceRepo.save(Dto);
  }

  findAll() {
    return this.ServiceRepo.find();
  }

  findOne(id: number) {
    return this.ServiceRepo.findOneBy({ id });
  }
  getByName(name: string) {
    return this.ServiceRepo.findOneBy({ name });
  }

  update(id: number, Dto: CreateServiceDto) {
    return this.ServiceRepo.update(id, Dto);
  }

  remove(id: number) {
    return this.ServiceRepo.delete(id);
  }
}
