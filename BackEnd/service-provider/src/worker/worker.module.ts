import { Module } from '@nestjs/common';
import { WorkerListModule } from './worker-list/worker-list.module';

@Module({
  controllers: [],
  providers: [],
  imports: [WorkerListModule],
})
export class WorkerModule {}
