import { PartialType } from '@nestjs/mapped-types';
import { CreateManagerListDto } from './create-manager_list.dto';

export class UpdateManagerListDto extends PartialType(CreateManagerListDto) {}
