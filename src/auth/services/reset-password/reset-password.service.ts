import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ResetPasswordDto,
  SendResetPasswordLinkDto,
} from 'src/auth/dto/reset-password.dto';
import { HashService } from 'src/hash/hash.service';
import { PasswordReset } from 'src/schemas/password-reset.schema';
import appConfig from 'src/shared/config/app.config';
import { UsersService } from 'src/users/users.service';
import { AccessTokenService } from '../access-token/access-token.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectModel(PasswordReset.name)
    private readonly passwordResetModel: Model<PasswordReset>,
    private readonly userService: UsersService,
    private readonly hashService: HashService,
    @Inject(appConfig.KEY)
    private readonly configApp: ConfigType<typeof appConfig>,
    private readonly eventEmitter: EventEmitter2,
    private readonly accessTokenService: AccessTokenService,
  ) {}

  async sendResetPasswordLink(
    sendResetPasswordLinkDto: SendResetPasswordLinkDto,
  ) {
    const user = await this.userService.findOneByEmail(
      sendResetPasswordLinkDto.email,
    );

    if (!user) {
      throw new NotFoundException('کاربری با ایمیل مدنظر یافت نشد');
    }
    await this.revokeOldResetPasswords(sendResetPasswordLinkDto);
    const [token, hashsedToken] = await this.hashService.createRandomHash();
    await new this.passwordResetModel({
      userId: user._id,
      email: sendResetPasswordLinkDto.email,
      token: hashsedToken,
      expiredAt: new Date(new Date().setHours(new Date().getHours() + 1)),
    }).save();

    const link = `${this.configApp.fullResetPasswordUrl}?token=${token}&id=${user._id}`;

    this.eventEmitter.emit('user.reset-password', {
      user,
      link,
      frontUrl: this.configApp.frontUrl,
    });

    return link;
  }

  async resetPasword(resetPasswordDto: ResetPasswordDto) {
    const resetPasswordRecord = await this.passwordResetModel.findOne(
      {
        email: resetPasswordDto.email,
        userId: resetPasswordDto.id,
        expiredAt: { $gte: new Date() },
      },
      [],
      { sort: { createdAt: -1 } },
    );

    if (!resetPasswordRecord) {
      throw new BadRequestException(
        'اطلاعات ارسالی برای بازیابی رمز عبور درست نیست',
      );
    }
    const isTokenValid = await this.hashService.compare(
      resetPasswordDto.token,
      resetPasswordRecord.token,
    );

    if (!isTokenValid) {
      throw new BadRequestException(
        'اطلاعات ارسالی برای بازیابی رمز عبور درست نیست',
      );
    }
    await this.userService.updateUserPassword(
      resetPasswordDto.id,
      resetPasswordDto.password,
    );
    resetPasswordRecord.expiredAt = new Date();
    resetPasswordRecord.save();

    const user = await this.userService.findById(resetPasswordDto.id);

    const accessToken = await this.accessTokenService.createToken(user);

    return {
      accessToken,
    };
  }

  private async revokeOldResetPasswords(
    sendResetPasswordLinkDto: SendResetPasswordLinkDto,
  ) {
    await this.passwordResetModel
      .updateMany(
        {
          $and: [
            {
              $or: [{ expiredAt: { $gte: new Date() } }, { expiredAt: null }],
            },
            { email: sendResetPasswordLinkDto.email },
          ],
        },
        {
          $set: {
            expiredAt: new Date(),
          },
        },
      )
      .exec();
  }
}
