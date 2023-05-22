import { Module } from '@nestjs/common';
import { AdminListModule } from './admin-list/admin-list.module';
import { ManageModule } from './manage/manage.module';
import { SalaryModule } from './salary/salary.module';

@Module({
  controllers: [],
  providers: [],
  imports: [AdminListModule, ManageModule, SalaryModule],
})
export class AdminModule {}
