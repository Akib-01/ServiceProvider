import { Module } from '@nestjs/common';
import { WorkerListController } from './worker-list.controller';
import { WorkerListService } from './worker-list.service';

@Module({
  controllers: [WorkerListController],
  providers: [WorkerListService],
})
export class WorkerListModule {}
