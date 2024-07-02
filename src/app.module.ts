import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { CalendarModule } from './calendar/calendar.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    PostModule,
    SubscriptionModule,
    CalendarModule,
    JwtModule.register({
      secret: 'secretKey', // Replace with a more secure key in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
