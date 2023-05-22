import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { CreateWorkerListDto } from 'src/worker/worker-list/dto/create-worker-list.dto';
import { WorkerList } from 'src/worker/worker-list/entities/worker-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManageService {
  constructor(
    @InjectRepository(WorkerList)
    private workerRepo: Repository<WorkerList>,
    @InjectRepository(ManagerList)
    private managerRepo: Repository<ManagerList>,
  ) {}
  createWorker(dto: CreateWorkerListDto) {
    return this.workerRepo.save(dto);
  }

  findAllWorker() {
    return this.workerRepo.find();
  }

  findOneWorkerById(id: number) {
    return this.workerRepo.findOneBy({ id });
  }
  findOneWorkerByName(name: string) {
    return this.workerRepo.findOneBy({ name });
  }

  updateWorkerById(id: number, dto: CreateWorkerListDto) {
    return this.workerRepo.update(id, dto);
  }

  removeWorker(id: number) {
    return this.workerRepo.delete(id);
  }
  createManager(dto: CreateWorkerListDto) {
    return this.managerRepo.save(dto);
  }

  findAllManager() {
    return this.managerRepo.find();
  }

  findOneManagerById(id: number) {
    return this.managerRepo.findOneBy({ id });
  }
  findOneManagerByName(name: string) {
    return this.managerRepo.findOneBy({ name });
  }

  updateManagerById(id: number, dto: CreateWorkerListDto) {
    return this.managerRepo.update(id, dto);
  }

  removeManager(id: number) {
    return this.managerRepo.delete(id);
  }
}
