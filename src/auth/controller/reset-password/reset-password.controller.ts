import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
import { ResetPasswordService } from 'src/auth/services/reset-password/reset-password.service';
import { AuthTypes } from 'src/auth/types/auth-types.enum';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception/http-exception.filter';

@Controller('auth/reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @UseFilters(new HttpExceptionFilter())
  @Auth(AuthTypes.None)
  @Post()
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordService.resetPasword(resetPasswordDto);
  }
}
