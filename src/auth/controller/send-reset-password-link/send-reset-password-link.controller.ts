import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { SendResetPasswordLinkDto } from 'src/auth/dto/reset-password.dto';
import { ResetPasswordService } from 'src/auth/services/reset-password/reset-password.service';
import { AuthTypes } from 'src/auth/types/auth-types.enum';

@Controller('auth/send-reset-password-link')
export class SendResetPasswordLinkController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Auth(AuthTypes.None)
  @Post()
  resetPassword(@Body() sendResetPasswordLinkDto: SendResetPasswordLinkDto) {
    return this.resetPasswordService.sendResetPasswordLink(
      sendResetPasswordLinkDto,
    );
  }
}
