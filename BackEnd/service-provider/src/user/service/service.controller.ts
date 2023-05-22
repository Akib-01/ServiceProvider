import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('insert')
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }
  //@UsePipes(new ValidationPipe())
  @Get('/get')
  findAll() {
    return this.serviceService.findAll();
  }
  //@UsePipes(new ValidationPipe())
  @Get('/get/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.serviceService.findOne(+id);
  }
  @Get('/getByName/:name')
  getByName(@Param('name') name: string) {
    const decodedName = decodeURIComponent(name);
    return this.serviceService.getByName(decodedName);
  }
  //@UsePipes(new ValidationPipe())
  @Put('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateServiceDto: CreateServiceDto,
  ) {
    return this.serviceService.update(+id, updateServiceDto);
  }
  //@UsePipes(new ValidationPipe())
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.serviceService.remove(+id);
  }
}
