import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkout } from '../checkout/entities/checkout.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private ReportRepo: Repository<Report>,
    @InjectRepository(Checkout)
    private readonly checkout: Repository<Checkout>,
  ) {}
  async create(dto: CreateReportDto): Promise<Report> {
    const { CheckoutId, ...Reportdata } = dto;
    const checkout = await this.checkout.findOne({
      where: { id: CheckoutId },
    });
    const report = new Report();
    report.details = Reportdata.details;
    report.type = Reportdata.type;
    report.Checkout = checkout;

    return await this.ReportRepo.save(report);
  }

  async findAll() {
    return await this.ReportRepo.find({ relations: ['Checkout'] });
  }

  async findOne(id: number) {
    return await this.ReportRepo.findOneBy({ id });
  }

  async update(id: number, dto: CreateReportDto): Promise<Report> {
    const { CheckoutId, ...Reportdata } = dto;

    const checkout = await this.checkout.findOne({
      where: { id: CheckoutId },
    });

    const report = await this.ReportRepo.findOne({
      where: { id },
      relations: ['Checkout'],
    });

    report.details = Reportdata.details;
    report.type = Reportdata.type;
    report.Checkout = checkout;

    return await this.ReportRepo.save(report);
  }

  async remove(id: number) {
    return await this.ReportRepo.delete(id);
  }
}
