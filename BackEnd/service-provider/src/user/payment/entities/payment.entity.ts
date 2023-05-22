import { Checkout } from 'src/user/checkout/entities/checkout.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';

@Entity('Payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  paymentType: string;
  @Column()
  paymentInfo: string;
  @ManyToOne(() => Checkout, (Checkout) => Checkout.Payment)
  Checkout: Checkout;
}
