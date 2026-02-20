import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  async validateUser(email: string, password: string) {
    console.log(email, password)
    const user = await this.adminService.findAdmin(email);
    console.log(user)
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)

    if(!isMatch){
      return null;
    }
    
    return user;
  }

   login(user: any) {
    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
