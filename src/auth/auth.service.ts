import { Injectable } from '@nestjs/common';
import { ActiveUserInterface } from 'src/users/interfaces/active-user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  getUser(user: ActiveUserInterface) {
    return this.userService.getActiveUser(user);
  }
}
