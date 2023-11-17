import { SetMetadata } from '@nestjs/common';
import { AuthTypes } from '../types/auth-types.enum';

export const AUTH_TYPE_KEY = 'authType';

export const Auth = (...authTypes: AuthTypes[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
