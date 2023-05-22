import { Injectable } from '@nestjs/common';
import { CreateWorkerListDto } from './dto/create-worker-list.dto';
import { UpdateWorkerListDto } from './dto/update-worker-list.dto';

@Injectable()
export class WorkerListService {
  create(createWorkerListDto: CreateWorkerListDto) {
    return 'This action adds a new workerList';
  }

  findAll() {
    return `This action returns all workerList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workerList`;
  }

  update(id: number, updateWorkerListDto: UpdateWorkerListDto) {
    return `This action updates a #${id} workerList`;
  }

  remove(id: number) {
    return `This action removes a #${id} workerList`;
  }
}
