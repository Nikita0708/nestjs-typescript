import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users = [];

  async createUser(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), username, password: hashedPassword };
    this.users.push(user);
    return user;
  }

  async findUser(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
