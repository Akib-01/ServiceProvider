import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateWorkerListDto } from './dto/create-worker-list.dto';
import { UpdateWorkerListDto } from './dto/update-worker-list.dto';
import { WorkerListService } from './worker-list.service';

@Controller('worker-list')
export class WorkerListController {
  constructor(private readonly workerListService: WorkerListService) {}

  @Post()
  create(@Body() createWorkerListDto: CreateWorkerListDto) {
    return this.workerListService.create(createWorkerListDto);
  }

  @Get()
  findAll() {
    return this.workerListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkerListDto: UpdateWorkerListDto,
  ) {
    return this.workerListService.update(+id, updateWorkerListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerListService.remove(+id);
  }
}
