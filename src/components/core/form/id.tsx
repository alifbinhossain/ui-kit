import { REGEXP_ONLY_DIGITS } from 'input-otp';

import FormOTP from './otp';
import type { FormOtpProps } from './types';

const FormID: React.FC<
  Omit<FormOtpProps, 'maxLength' | 'minLength' | 'pattern'>
> = ({ field, ...props }) => {
  return (
    <FormOTP
      maxLength={9}
      minLength={9}
      pattern={REGEXP_ONLY_DIGITS}
      {...props}
      field={field}
    />
  );
};

export default FormID;
