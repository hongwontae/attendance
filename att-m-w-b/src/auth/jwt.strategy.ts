import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(configService : ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req)=>{
          const cook =  req?.cookies?.accessToken;
          console.log(cook)
          return cook
        }
      ]),
      secretOrKey: configService.get<string>('jwt_key')!,
      ignoreExpiration: false,  
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}