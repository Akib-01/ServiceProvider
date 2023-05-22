import { Checkout } from 'src/user/checkout/entities/checkout.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';

@Entity('Report')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @Column()
  details: string;

  @ManyToOne(() => Checkout, (Checkout) => Checkout.Report)
  Checkout: Checkout;
}
