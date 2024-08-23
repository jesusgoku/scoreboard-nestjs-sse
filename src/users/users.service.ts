import { Injectable } from '@nestjs/common';

export interface User {
  username: string;

  /** SHA256 hash of password */
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: Record<User['username'], User> = {
    jesusgoku: {
      username: 'jesusgoku',
      password:
        '51a12d558cde476ef6eb3ecae7298f9b0e156f9b271d7a4c2e392ee6bc58ca57',
    },
  };

  async findByUsername(username: User['username']) {
    return this.users[username];
  }
}
