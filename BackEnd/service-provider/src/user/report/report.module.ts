import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout } from '../checkout/entities/checkout.entity';
import { Report } from './entities/report.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Checkout])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
