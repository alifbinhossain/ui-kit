import type {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormReturn,
  UseFormStateReturn,
} from 'react-hook-form';

import type { InputProps } from '../../ui/input';
import type { TextareaProps } from '../../ui/textarea';
import type { DayPickerProps } from 'react-day-picker';
import type { CheckboxProps } from '@radix-ui/react-checkbox';
import type { RadioGroupProps } from '@radix-ui/react-radio-group';
import type { IFormSelectOption } from '../../../types';

import * as SelectPrimitive from '@radix-ui/react-select';
import type { DropzoneOptions } from 'react-dropzone';
import type { OTPInputProps } from 'input-otp';

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

export interface FormRadioProps extends IFieldProps, RadioGroupProps {
  options: IFormSelectOption[];
}

export interface FormSelectProps
  extends IFieldProps,
    React.ComponentProps<typeof SelectPrimitive.Root> {
  options: IFormSelectOption[];
  valueType?: 'string' | 'number';
  isDisabled?: boolean;
  isLoading?: boolean;
}

export interface FormMultiSelectProps extends IFieldProps {
  isDisabled?: boolean;
  options: IFormSelectOption[];
}

export interface FormReactSelectProps extends IFieldProps {
  options: IFormSelectOption[];
  unique?: boolean;
  excludeOptions?: string[];
  isMulti?: boolean;
  menuPortalTarget?: any;
  valueType?: 'string' | 'number';
  isDisabled?: boolean;
  value?: any;
  isLoading?: boolean;
  onChange?: (option?: any, field?: any) => void;
}

export interface IFormSectionProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  extraHeader?: React.ReactNode;
}

export interface FormJoinInputUnitProps extends IFieldProps, InputProps {
  icon?: React.ReactNode;
  unit: string;
}

export interface FormJoinInputSelectProps extends IFieldProps, InputProps {
  icon?: React.ReactNode;
  selectField: {
    name: string;
    options: IFormSelectOption[];
    isDisabled?: boolean;
  };
}

export interface IFormAddEditWrapperProps {
  children: React.ReactNode;
  form: UseFormReturn<any, any, undefined>;
  onSubmit(values: any): void;
  title?: string;
  isSubmitDisable?: boolean;
}

export interface FormFileUploadProps extends IFieldProps, InputProps {
  imageBaseUrl: string;
  options?: DropzoneOptions;
  isUpdate?: boolean;
  fileType?: 'image' | 'document' | 'all' | 'video' | 'audio';
  errorText?: string;
  small?: boolean;
  previewClassName?: string;
}

export interface FormSwitchProps extends IFieldProps, CheckboxProps {
  icon?: React.ReactNode;
  labelClassName?: string;
  isBoxed?: boolean;
}

export type FormOtpProps = Omit<OTPInputProps, 'children'> & {
  field: ControllerRenderProps<any, any>;
  label?: string;
  subLabel?: string;
  placeholder?: string;
  optional?: boolean;
  disableLabel?: boolean;
  disabled?: boolean;
  labelClassName?: string;
};

export interface FormDatePickerProps extends IFieldProps {
  icon?: React.ReactNode;
  className?: string;
  calendarProps?: DayPickerProps;
}
