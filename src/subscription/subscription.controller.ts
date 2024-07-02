import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  subscribe(@Body() body: { followerId: number; followeeId: number }) {
    return this.subscriptionService.subscribe(body.followerId, body.followeeId);
  }

  @Get('followers/:userId')
  getFollowers(@Param('userId') userId: number) {
    return this.subscriptionService.getFollowers(userId);
  }

  @Get('followees/:userId')
  getFollowees(@Param('userId') userId: number) {
    return this.subscriptionService.getFollowees(userId);
  }

  @Delete()
  unsubscribe(@Body() body: { followerId: number; followeeId: number }) {
    return this.subscriptionService.unsubscribe(
      body.followerId,
      body.followeeId,
    );
  }
}
