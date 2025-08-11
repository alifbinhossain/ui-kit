import type {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from 'react-hook-form';

import type { InputProps } from '../../ui/input';
import type { TextareaProps } from '../../ui/textarea';

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
