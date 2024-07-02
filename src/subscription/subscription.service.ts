import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { User } from '../user/user.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async subscribe(followerId: number, followeeId: number) {
    const subscription = this.subscriptionRepository.create({
      follower: { id: followerId },
      followee: { id: followeeId },
    });
    return this.subscriptionRepository.save(subscription);
  }

  async getFollowers(userId: number) {
    return this.subscriptionRepository.find({
      where: { followee: { id: userId } },
      relations: ['follower'],
    });
  }

  async getFollowees(userId: number) {
    return this.subscriptionRepository.find({
      where: { follower: { id: userId } },
      relations: ['followee'],
    });
  }

  async unsubscribe(followerId: number, followeeId: number) {
    await this.subscriptionRepository.delete({
      follower: { id: followerId },
      followee: { id: followeeId },
    });
    return { message: 'Unsubscribed' };
  }
}
