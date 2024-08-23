import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { createHash, timingSafeEqual } from 'node:crypto';
import { JwtService } from '@nestjs/jwt';

export interface TokenPayload extends Omit<User, 'password'> {
  sub: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: User['username'], password: User['password']) {
    const user = await this.usersService.findByUsername(username);

    if (!this.compare(user.password, this.hash(password))) {
      throw new UnauthorizedException();
    }

    return {
      token: await this.jwtService.signAsync({
        sub: user.username,
        username: user.username,
      }),
    };
  }

  private hash(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }

  private compare(a: User['password'], b: User['password']) {
    const encoder = new TextEncoder();

    return timingSafeEqual(encoder.encode(a), encoder.encode(b));
  }
}
