import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Booking_Status')
export class BookingStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status: string;
  @Column()
  validity: string;
  @Column()
  servicestatus: string;
  @ManyToOne(() => ManagerList, (manager_list) => manager_list.Booking_Status)
  Manager_list: ManagerList;
}
