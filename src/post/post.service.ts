import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(userId: number, content: string) {
    const post = this.postRepository.create({ user: { id: userId }, content });
    return this.postRepository.save(post);
  }

  async getAllPosts() {
    return this.postRepository.find({ relations: ['user'] });
  }

  async getUserPosts(userId: number) {
    return this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async deletePost(postId: number) {
    await this.postRepository.delete(postId);
    return { message: 'Post deleted' };
  }
}
