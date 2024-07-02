import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
  private subscriptions = [];

  subscribe(followerId: number, followeeId: number) {
    const subscription = { id: Date.now(), followerId, followeeId };
    this.subscriptions.push(subscription);
    return subscription;
  }

  getFollowers(userId: number) {
    return this.subscriptions.filter((sub) => sub.followeeId === userId);
  }

  getFollowees(userId: number) {
    return this.subscriptions.filter((sub) => sub.followerId === userId);
  }

  unsubscribe(followerId: number, followeeId: number) {
    this.subscriptions = this.subscriptions.filter(
      (sub) => sub.followerId !== followerId || sub.followeeId !== followeeId,
    );
    return { message: 'Unsubscribed' };
  }
}
