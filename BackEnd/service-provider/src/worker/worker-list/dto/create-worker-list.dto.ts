import {
  Equals,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWorkerListDto {
  @IsInt({ message: 'id should be integer' })
  @IsNotEmpty({ message: 'Id is required' })
  id: number;
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name Should be string' })
  name: string;
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsPhoneNumber('BD', { message: 'Please enter a valid phone number' })
  phone: string;
  @IsNotEmpty({ message: 'Email is required' })
  @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i, {
    message: 'Invalid email address',
  })
  email: string;
  @IsDate()
  @IsNotEmpty({ message: 'Date of birth is required' })
  DOB: string;
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(2, { message: 'Username should be at least 2 characters' })
  @MaxLength(10, {
    message: 'Username should not be more than 10 characters',
  })
  username: string;
  @IsNotEmpty({ message: 'Password is required' })
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
  password: string;
  @IsNotEmpty({ message: 'Confirm Password is required' })
  @Equals('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
