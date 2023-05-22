import { Salary } from 'src/admin/salary/entities/salary.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('worker')
export class WorkerList {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
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
  @ManyToOne(() => Salary, (Salary) => Salary.Worker)
  Salary: Salary;
}
