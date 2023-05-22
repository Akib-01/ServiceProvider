import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReportDto {
  @IsInt({ message: 'Id should be integer' })
  @IsNotEmpty({ message: 'Id is required' })
  id: number;
  @IsNotEmpty({ message: 'type is required' })
  @IsString({ message: 'type Should be string' })
  type: string;
  @IsNotEmpty({ message: 'details is required' })
  @IsString({ message: 'details Should be string' })
  details: string;

  CheckoutId: number;
}
