import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './controller/auth.controller';
import { LoginService } from './services/login/login.service';
import { LoginController } from './controller/login/login.controller';
import { RegisterController } from './controller/register/register.controller';
import { RegisterService } from './services/register/register.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenService } from './services/access-token/access-token.service';
import jwtConfig from './config/jwt.config';
import { HashModule } from 'src/hash/hash.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { ResetPasswordController } from './controller/reset-password/reset-password.controller';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { SendResetPasswordLinkController } from './controller/send-reset-password-link/send-reset-password-link.controller';
import { SendResetPasswordLinkService } from './sevices/send-reset-password-link/send-reset-password-link.service';
import { SharedModule } from 'src/shared/shared.module';
import {
  PasswordReset,
  PasswordResetSchema,
} from 'src/schemas/password-reset.schema';
import appConfig from 'src/shared/config/app.config';

@Module({
  controllers: [
    AuthController,
    LoginController,
    RegisterController,
    ResetPasswordController,
    SendResetPasswordLinkController,
  ],
  providers: [
    AuthService,
    LoginService,
    RegisterService,
    AccessTokenService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    ResetPasswordService,
    SendResetPasswordLinkService,
  ],
  imports: [
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(appConfig),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PasswordReset.name, schema: PasswordResetSchema },
    ]),
    UsersModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    HashModule,
  ],
})
export class AuthModule {}
