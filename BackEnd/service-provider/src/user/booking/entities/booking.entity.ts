import { Service } from 'src/user/service/entities/service.entity';
import { UserList } from 'src/user/user-list/entities/user-list.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  time: string;
  @ManyToOne(() => UserList, (UserList) => UserList.Booking)
  UserList: UserList;
  @ManyToOne(() => Service, (Service) => Service.Booking)
  Service: Service;
}
