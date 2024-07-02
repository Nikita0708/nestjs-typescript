import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const user = await this.userService.createUser(
      body.username,
      body.password,
    );
    return user;
  }

  @Public()
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.userService.findUser(body.username);
    if (user && (await bcrypt.compare(body.password, user.password))) {
      const payload = { username: user.username, sub: user.id };
      const token = this.jwtService.sign(payload);
      return { message: 'Login successful', token };
    }
    return { message: 'Invalid credentials' };
  }
}
