import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthorsService } from '../../authors/authors.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authorService: AuthorsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.access_secret'),
    });
  }

  async validate(payload: any) {
    const user = await this.authorService.findOneByName(payload.name);
    if (!user || user.id !== payload.sub) {
      throw new UnauthorizedException();
    }
    delete user.password;
    return user;
  }
}
