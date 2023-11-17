import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from 'src/schemas/user.schema';
import { ResetPasswordEmail } from './types/email.type';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  resetPasswordEmail(email: ResetPasswordEmail) {
    const subject = `لینک بازیابی رمز عبور`;

    this.mailerService.sendMail({
      to: email.to,
      subject,
      template: './reset-password',
      context: {
        name: email.data.name,
        link: email.data.link,
        frontUrl: email.data.frontUrl,
      },
    });
  }

  @OnEvent('user.reset-password')
  sendResetPasswordLink(payload: {
    user: User;
    link: string;
    frontUrl: string;
  }) {
    this.resetPasswordEmail({
      to: payload.user.email,
      data: {
        name: payload.user.name,
        link: payload.link,
        frontUrl: payload.frontUrl,
      },
    });
  }
}
