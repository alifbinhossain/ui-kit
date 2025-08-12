import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { cn } from '@/lib/utils';

import type { FormOtpProps } from './types';

const FormOTP: React.FC<FormOtpProps> = ({
  maxLength,
  minLength,
  pattern,
  field,
  label,
  subLabel,
  placeholder = 'Write here',
  optional = false,
  className,
  disabled = false,
  disableLabel,
}) => {
  return (
    <FormItem className='w-full space-y-1.5'>
      {!disableLabel && (
        <FormLabel className='flex items-center justify-between capitalize'>
          <span>
            {label || field.name.replace('_', ' ')}{' '}
            {optional ? <span className='text-xs'>(Optional)</span> : ''}
          </span>
          {subLabel && <span className='text-xs'>{subLabel}</span>}
        </FormLabel>
      )}

      <FormControl>
        <InputOTP
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          placeholder={placeholder}
          className={cn('sb-red w-full', className)}
          disabled={disabled}
          {...field}
        >
          <InputOTPGroup>
            {[...Array(maxLength).keys()].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className='w-[2.05rem] md:w-[2.25rem]'
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormOTP;
