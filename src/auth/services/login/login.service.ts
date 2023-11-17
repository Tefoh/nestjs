import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { AccessTokenService } from '../access-token/access-token.service';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UsersService,
    private readonly accessTokenService: AccessTokenService,
    private readonly hashService: HashService,
  ) {}

  async loginService(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (
      !(await this.hashService.compare(loginDto.password, user?.password ?? ''))
    ) {
      throw new UnauthorizedException('اطلاعات وارد شده اشتباه میباشد.');
    }

    const accessToken = await this.accessTokenService.createToken(user);

    return {
      accessToken,
    };
  }
}
