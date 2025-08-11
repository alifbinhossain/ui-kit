import type {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from 'react-hook-form';

import type { InputProps } from '../../ui/input';
import type { TextareaProps } from '../../ui/textarea';
import type { DayPickerProps } from 'react-day-picker';
import type { CheckboxProps } from '@radix-ui/react-checkbox';

interface IFieldProps {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<any>;
  label?: string;
  subLabel?: string;
  placeholder?: string;
  optional?: boolean;
  disableLabel?: boolean;
  disabled?: boolean;
}

export interface FormInputProps extends IFieldProps, InputProps {
  icon?: React.ReactNode;
}

export interface FormTextareaProps extends IFieldProps, TextareaProps {}

export interface FormDatePickerProps extends IFieldProps {
  icon?: React.ReactNode;
  className?: string;
  calendarProps?: DayPickerProps;
}

export interface FormCheckboxProps extends IFieldProps, CheckboxProps {
  icon?: React.ReactNode;
  labelClassName?: string;
  isBoxed?: boolean;
}
