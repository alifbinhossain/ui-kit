import { FORTUNE_ZIP_EMAIL_PATTERN, PASSWORD } from '@/utils/validators';
import { z } from 'zod';

export const LOGIN_SCHEMA = z.object({
  email: FORTUNE_ZIP_EMAIL_PATTERN,
  pass: PASSWORD,
});

export const LOGIN_NULL = {
  email: '',
  pass: '',
};

export type ILoginData = z.infer<typeof LOGIN_SCHEMA>;
