import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsPasswordStrong } from '../validator/IsPasswordStrong.validator';
import { Match } from 'src/shared/decorators/match.decorator';

export class SendResetPasswordLinkDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Validate(IsPasswordStrong)
  @Match('confirmationPassword')
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmationPassword: string;
}
