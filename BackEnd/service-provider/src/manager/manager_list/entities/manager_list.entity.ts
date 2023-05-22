import { Salary } from 'src/admin/salary/entities/salary.entity';
import { BookingStatus } from 'src/manager/booking_status/entities/booking_status.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';

@Entity('Manager_list')
export class ManagerList {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  DOB: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  confirmPassword: string;
  @Column()
  filename: string;
  @OneToMany(() => BookingStatus, (Booking_Status) => Booking_Status.Manager_list)
  Booking_Status: BookingStatus[];
  @ManyToOne(() => Salary, (Salary) => Salary.Manager)
  Salary: Salary;
}
