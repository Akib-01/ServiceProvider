import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { WorkerList } from 'src/worker/worker-list/entities/worker-list.entity';
import { Salary } from './entities/salary.entity';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Salary, WorkerList, ManagerList])],
  controllers: [SalaryController],
  providers: [SalaryService],
})
export class SalaryModule {}
