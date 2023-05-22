import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerListDto } from './create-worker-list.dto';

export class UpdateWorkerListDto extends PartialType(CreateWorkerListDto) {}
