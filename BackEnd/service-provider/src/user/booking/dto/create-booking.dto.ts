export class CreateBookingDto {
  //@IsNotEmpty({ message: 'Id is required' })
  id: number;
  //@IsNotEmpty({ message: 'Time is required' })
  time: string;

  userListId: number;

  serviceId: number;
}
