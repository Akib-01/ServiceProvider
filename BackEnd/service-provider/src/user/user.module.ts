import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { CheckoutModule } from './checkout/checkout.module';
import { FeedBackModule } from './feed-back/feed-back.module';
import { PaymentModule } from './payment/payment.module';
import { ReportModule } from './report/report.module';
import { ServiceModule } from './service/service.module';
import { UserListModule } from './user-list/user-list.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'abdullahakib1999@gmail.com',
          pass: 'ezgoapuislqaqozj',
        },
      },
    }),
    UserListModule,
    BookingModule,
    ServiceModule,
    CheckoutModule,
    PaymentModule,
    ReportModule,
    FeedBackModule,
  ],
})
export class UserModule {}
