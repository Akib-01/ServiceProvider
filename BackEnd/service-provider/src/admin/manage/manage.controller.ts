import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  // eslint-disable-next-line prettier/prettier
  ValidationPipe
} from '@nestjs/common';
import { CreateManagerListDto } from 'src/manager/manager_list/dto/create-manager_list.dto';
import { CreateWorkerListDto } from 'src/worker/worker-list/dto/create-worker-list.dto';
import { ManageService } from './manage.service';

@Controller('manage')
export class ManageController {
  constructor(private readonly manageService: ManageService) {}
  @UsePipes(new ValidationPipe())
  @Post('worker/insert')
  createWorker(@Body() createWorkerListDto: CreateWorkerListDto) {
    return this.manageService.createWorker(createWorkerListDto);
  }
  @UsePipes(new ValidationPipe())
  @Get('worker/get')
  findAllWorker() {
    return this.manageService.findAllWorker();
  }
  @UsePipes(new ValidationPipe())
  @Get('worker/get/:id')
  findOneWorker(@Param('id', ParseIntPipe) id: number) {
    return this.manageService.findOneWorkerById(+id);
  }
  @UsePipes(new ValidationPipe())
  @Get('worker/:name')
  findOneWorkerByName(@Param('name') name: string) {
    return this.manageService.findOneWorkerById(+name);
  }
  @UsePipes(new ValidationPipe())
  @Patch('worker/update/:id')
  updateWorker(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBookingDto: CreateWorkerListDto,
  ) {
    return this.manageService.updateWorkerById(+id, updateBookingDto);
  }
  @UsePipes(new ValidationPipe())
  @Delete('worker/delete/:id')
  removeWorker(@Param('id', ParseIntPipe) id: string) {
    return this.manageService.removeWorker(+id);
  }
  @UsePipes(new ValidationPipe())
  @Post('manager/insert')
  createmanager(@Body() createmanagerListDto: CreateManagerListDto) {
    return this.manageService.createManager(createmanagerListDto);
  }
  @UsePipes(new ValidationPipe())
  @Get('manager/get')
  findAllmanager() {
    return this.manageService.findAllManager();
  }
  @UsePipes(new ValidationPipe())
  @Get('manager/get/:id')
  findOnemanager(@Param('id', ParseIntPipe) id: number) {
    return this.manageService.findOneManagerById(+id);
  }
  @Get('manager/:name')
  findOneManagerByName(@Param('name') name: string) {
    return this.manageService.findOneManagerById(+name);
  }
  @UsePipes(new ValidationPipe())
  @Patch('manager/update/:id')
  updatemanager(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBookingDto: CreateManagerListDto,
  ) {
    return this.manageService.updateManagerById(+id, updateBookingDto);
  }
  @UsePipes(new ValidationPipe())
  @Delete('manager/delete/:id')
  removemanager(@Param('id', ParseIntPipe) id: string) {
    return this.manageService.removeManager(+id);
  }
}
