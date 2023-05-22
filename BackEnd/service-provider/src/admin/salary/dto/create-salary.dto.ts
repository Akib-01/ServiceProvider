import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSalaryDto {
  @IsInt({ message: 'id should be integer' })
  @IsNotEmpty({ message: 'Id is required' })
  id: number;
  @IsInt({ message: 'salary should be integer' })
  @IsNotEmpty({ message: 'salary is required' })
  salary: number;
  @IsInt({ message: 'increment should be integer' })
  @IsNotEmpty({ message: 'increment is required' })
  increment: number;
  @IsInt({ message: 'bonus should be integer' })
  @IsNotEmpty({ message: 'bonus is required' })
  bonus: number;
  @IsInt({ message: 'Workerid should be integer' })
  @IsNotEmpty({ message: 'Workerid is required' })
  Workerid: number;
  @IsInt({ message: 'Managerid should be integer' })
  @IsNotEmpty({ message: 'Managerid is required' })
  Managerid: number;
}
