import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { Salary } from './entities/salary.entity';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(Salary)
    private salaryRepo: Repository<Salary>,
  ) {}
  create(Dto: CreateSalaryDto) {
    return this.salaryRepo.save(Dto);
  }

  findAll() {
    return this.salaryRepo.find();
  }

  findOne(id: number) {
    return this.salaryRepo.findOneBy({ id });
  }

  update(id: number, Dto: CreateSalaryDto) {
    return this.salaryRepo.update(id, Dto);
  }

  remove(id: number) {
    return this.salaryRepo.delete(id);
  }
}
