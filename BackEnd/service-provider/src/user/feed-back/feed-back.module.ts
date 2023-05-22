import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../service/entities/service.entity';
import { FeedBack } from './entities/feed-back.entity';
import { FeedBackController } from './feed-back.controller';
import { FeedBackService } from './feed-back.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedBack, Service])],
  controllers: [FeedBackController],
  providers: [FeedBackService],
})
export class FeedBackModule {}
