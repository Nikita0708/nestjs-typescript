import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() body: { userId: number; content: string }) {
    return this.postService.createPost(body.userId, body.content);
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('user/:userId')
  getUserPosts(@Param('userId') userId: number) {
    return this.postService.getUserPosts(userId);
  }

  @Delete(':postId')
  deletePost(@Param('postId') postId: number) {
    return this.postService.deletePost(postId);
  }
}
