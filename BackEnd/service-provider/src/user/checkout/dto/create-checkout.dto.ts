import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCheckoutDto {
  @IsInt({ message: 'Id should be integer' })
  @IsNotEmpty({ message: 'Id is required' })
  id: number;
  @IsNotEmpty({ message: 'Destination is required' })
  @IsString({ message: 'Destination Should be string' })
  destination: string;
  @IsNotEmpty({ message: 'Time is required' })
  time: string;
  paymentType: string;
  paymentPrice: number;
  userListId: number;
  serviceId: number;
}
