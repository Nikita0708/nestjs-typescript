import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { CalendarModule } from './calendar/calendar.module';
import { User } from './user/user.entity';
import { Post } from './post/post.entity';
import { Subscription } from './subscription/subscription.entity';
import { Event } from './calendar/calendar.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Post, Subscription, Event],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    SubscriptionModule,
    CalendarModule,
  ],
})
export class AppModule {}
