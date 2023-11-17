import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { RegisterService } from 'src/auth/services/register/register.service';
import { AuthTypes } from 'src/auth/types/auth-types.enum';

@Auth(AuthTypes.None)
@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.registerService.registerUser(registerDto);
  }
}
