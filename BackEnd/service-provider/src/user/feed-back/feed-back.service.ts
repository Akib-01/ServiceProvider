import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../service/entities/service.entity';
import { CreateFeedBackDto } from './dto/create-feed-back.dto';
import { FeedBack } from './entities/feed-back.entity';

@Injectable()
export class FeedBackService {
  constructor(
    @InjectRepository(FeedBack)
    private feedbackRepo: Repository<FeedBack>,
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}

  async create(dto: CreateFeedBackDto): Promise<FeedBack> {
    const { serviceId, ...feedbackData } = dto;
    const service = await this.serviceRepo.findOne({
      where: { id: serviceId },
    });
    const feedback = new FeedBack();
    feedback.rating = feedbackData.rating;
    feedback.comment = feedbackData.comment;
    feedback.Service = service;

    return await this.feedbackRepo.save(feedback);
  }

  async findAll() {
    return await this.feedbackRepo.find({ relations: ['Service'] });
  }

  async findOne(id: number) {
    return await this.feedbackRepo.findOneBy({ id });
  }

  async update(id: number, dto: CreateFeedBackDto): Promise<FeedBack> {
    const { serviceId, ...feedbackData } = dto;

    const service = await this.serviceRepo.findOne({
      where: { id: serviceId },
    });

    const feedback = await this.feedbackRepo.findOne({
      where: { id },
      relations: ['Service'],
    });

    feedback.rating = feedbackData.rating;
    feedback.comment = feedbackData.comment;
    feedback.Service = service;

    return await this.feedbackRepo.save(feedback);
  }

  async remove(id: number) {
    return await this.feedbackRepo.delete(id);
  }
}
