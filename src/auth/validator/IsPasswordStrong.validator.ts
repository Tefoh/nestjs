import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPasswordStrong', async: false })
@Injectable()
export class IsPasswordStrong implements ValidatorConstraintInterface {
  validate(text: any, $_: ValidationArguments) {
    if (!text) {
      return false;
    }

    return text.match(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
  }

  defaultMessage($_: ValidationArguments) {
    return 'The given password is too weak.';
  }
}
