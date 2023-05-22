import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedBackDto {
  // Validate that the "id" property is a non-empty integer
  @IsInt({ message: 'Id should be an integer' })
  @IsNotEmpty({ message: 'Id is required' })
  id: number;

  // Validate that the "rating" property is a non-empty integer
  @IsInt({ message: 'Rating should be an integer' })
  @IsNotEmpty({ message: 'Rating is required' })
  rating: number;

  // Validate that the "comment" property is a non-empty string
  @IsString({ message: 'Comment should be a string' })
  @IsNotEmpty({ message: 'Comment is required' })
  comment: string;

  serviceId: number;
}
