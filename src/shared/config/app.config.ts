import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  frontUrl: process.env.FRONT_URL,
  fullResetPasswordUrl: process.env.FULL_RESET_PASSWORD_URL,
}));
