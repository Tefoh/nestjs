import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsPasswordStrong } from '../validator/IsPasswordStrong.validator';
import { Match } from 'src/shared/decorators/match.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

export class RegisterDto extends UserEntity {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
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
