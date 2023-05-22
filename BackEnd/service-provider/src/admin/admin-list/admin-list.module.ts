import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminListController } from './admin-list.controller';
import { AdminListService } from './admin-list.service';
import { AdminList } from './entities/admin-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminList])],
  controllers: [AdminListController],
  providers: [AdminListService],
})
export class AdminListModule {}
