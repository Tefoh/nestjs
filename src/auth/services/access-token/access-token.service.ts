import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { User } from 'src/schemas/user.schema';
import { ActiveUserInterface } from 'src/users/interfaces/active-user.interface';

@Injectable()
export class AccessTokenService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly configJwt: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  createToken(user: User): Promise<string> {
    const payload = { sub: user._id, email: user.email } as ActiveUserInterface;

    return this.jwtService.signAsync(payload, {
      secret: this.configJwt.secret,
      issuer: this.configJwt.token.issuer,
      audience: this.configJwt.token.audience,
      expiresIn: this.configJwt.token.ttl,
    });
  }
}
