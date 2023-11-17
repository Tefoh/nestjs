import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

@Module({
  controllers: [],
  providers: [EmailService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: Number('2525'),
        secure: false,
        auth: {
          user: 'dafbdfe445393d',
          pass: '723d940e927bab',
        },
      },
      defaults: {
        from: '"Spacody" <from@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
})
export class EmailModule {}
