import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { ActiveUser } from 'src/users/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/users/interfaces/active-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AccessTokenGuard)
  @Get('user')
  getUser(@ActiveUser() user: ActiveUserInterface) {
    return this.authService.getUser(user);
  }
}
