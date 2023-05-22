import {
    IsInt,
    IsNotEmpty,
  } from 'class-validator';
import { CreateManagerListDto } from 'src/manager/manager_list/dto/create-manager_list.dto';
  
  export class CreateBookingStatusDto {
    @IsInt({ message: 'id should be integer' })
    @IsNotEmpty({ message: 'Id is required' })
    id: number;
    @IsNotEmpty({ message: 'Status is required' })
    status: string;
    @IsNotEmpty({ message: 'Validity is required' })
    validity: string;
    @IsNotEmpty({ message: 'Servicestatus is required' })
    servicestatus: string;
    @IsNotEmpty({ message: 'Manager_list is required' })
    Manager_listid:number;
  }
  