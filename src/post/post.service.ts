import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  private posts = [];

  createPost(userId: number, content: string) {
    const post = { id: Date.now(), userId, content };
    this.posts.push(post);
    return post;
  }

  getAllPosts() {
    return this.posts;
  }

  getUserPosts(userId: number) {
    return this.posts.filter((post) => post.userId === userId);
  }

  deletePost(postId: number) {
    this.posts = this.posts.filter((post) => post.id !== postId);
    return { message: 'Post deleted' };
  }
}
