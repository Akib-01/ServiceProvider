import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { UserModule } from './user/user.module';
import { WorkerModule } from './worker/worker.module';

@Module({
  imports: [
    UserModule,
    AdminModule,
    ManagerModule,
    WorkerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + 'entities/**/*.entity.ts'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
