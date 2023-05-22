import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { WorkerList } from 'src/worker/worker-list/entities/worker-list.entity';
import { AdminList } from '../admin-list/entities/admin-list.entity';
import { ManageController } from './manage.controller';
import { ManageService } from './manage.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerList, ManagerList, AdminList])],
  controllers: [ManageController],
  providers: [ManageService],
})
export class ManageModule {}
