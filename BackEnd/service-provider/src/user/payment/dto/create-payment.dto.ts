import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsInt({ message: 'Id should be integer' })
  @IsNotEmpty({ message: 'Id is required' })
  id: number;
  @IsNotEmpty({ message: 'type is required' })
  @IsString({ message: 'type Should be string' })
  paymentType: string;
  @IsNotEmpty({ message: 'payment Info is required' })
  @IsString({ message: 'payment Info Should be string' })
  paymentInfo: string;

  CheckoutId: number;
}
