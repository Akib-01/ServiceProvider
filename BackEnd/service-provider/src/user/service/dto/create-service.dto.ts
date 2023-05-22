import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {
  id: number;
  @IsNotEmpty({ message: 'Service Name is required' })
  @IsString({ message: 'Service Name Should be string' })
  name: string;
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(2, { message: 'Description should be at least 5 characters' })
  @MaxLength(1000, {
    message: 'Description should not be more than 1000 characters',
  })
  description: string;
  @IsNotEmpty({ message: 'Type is required' })
  @IsString({ message: 'Type Should be string' })
  type: string;
  @IsNotEmpty({ message: 'Availablity is required' })
  @IsBoolean({ message: 'Availablity should be Boolean' })
  isAvailable: boolean;
  @IsNotEmpty({ message: 'Price is required' })
  @IsInt({ message: 'Price should be integer' })
  price: number;
  @IsNotEmpty({ message: 'Price is required' })
  Picture: string;
}
