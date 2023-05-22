import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes
} from '@nestjs/common';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @UsePipes(new ValidationPipe())
  @Post('/insert')
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }
  @UsePipes(new ValidationPipe())
  @Get('/get')
  findAll() {
    return this.reportService.findAll();
  }
  @UsePipes(new ValidationPipe())
  @Get('/get/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.reportService.findOne(+id);
  }
  @UsePipes(new ValidationPipe())
  @Put('/update/:id')
  update(@Param('id', ParseIntPipe) id: string, @Body() Dto: CreateReportDto) {
    return this.reportService.update(+id, Dto);
  }
  @UsePipes(new ValidationPipe())
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.reportService.remove(+id);
  }
}
