import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { WorkerList } from 'src/worker/worker-list/entities/worker-list.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Salary')
export class Salary {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  salary: number;
  @Column()
  increment: number;
  @Column()
  bonus: number;
  @OneToMany(() => WorkerList, (Worker) => Worker.Salary)
  Worker: WorkerList[];
  @OneToMany(() => ManagerList, (Manager) => Manager.Salary)
  Manager: ManagerList[];
}
