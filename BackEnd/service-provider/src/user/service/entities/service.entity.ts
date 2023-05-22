import { Booking } from 'src/user/booking/entities/booking.entity';
import { Checkout } from 'src/user/checkout/entities/checkout.entity';
import { FeedBack } from 'src/user/feed-back/entities/feed-back.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';

@Entity('Service')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  type: string;
  @Column()
  isAvailable: boolean;
  @Column()
  price: number;
  @OneToMany(() => Booking, (Booking) => Booking.Service, { cascade: true })
  Booking: Booking[];
  @OneToMany(() => FeedBack, (FeedBack) => FeedBack.Service, { cascade: true })
  Feedback: FeedBack[];
  @OneToMany(() => Checkout, (Checkout) => Checkout.Service, { cascade: true })
  Checkout: Checkout[];
}
