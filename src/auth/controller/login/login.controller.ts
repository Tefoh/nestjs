import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { LoginDto } from 'src/auth/dto/login.dto';
import { LoginService } from 'src/auth/services/login/login.service';
import { AuthTypes } from 'src/auth/types/auth-types.enum';

@Auth(AuthTypes.None)
@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('')
  login(@Body() loginDto: LoginDto) {
    return this.loginService.loginService(loginDto);
  }
}
