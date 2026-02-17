import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 가짜 유저
  private user = {
    id: 1,
    email: 'admin@test.com',
    password: bcrypt.hashSync('1234', 10),
  };

  async validateUser(email: string, password: string) {
    console.log(email, password)
    if (email !== this.user.email) return null;

    const isMatch = await bcrypt.compare(password, this.user.password);
    if (!isMatch) return null;

    return { id: this.user.id, email: this.user.email };
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}