import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserToken } from 'src/auth/types/user-token.interface';
import { UsersService } from 'src/users/users.service';
import { AccessTokenService } from '../access-token/access-token.service';

@Injectable()
export class RegisterService {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly userService: UsersService,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<UserToken> {
    const duplicatedUser = await this.userService.findOneByEmail(
      registerDto.email,
    );

    if (duplicatedUser) {
      throw new ConflictException(
        'کاربر با ایمیل وارد شده از قبل ساخته شده است.',
      );
    }
    const user = await this.userService.createUser(registerDto);
    const accessToken = await this.accessTokenService.createToken(user);

    return {
      accessToken,
    };
  }
}
