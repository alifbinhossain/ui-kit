import FormSelect from './select';
import type { IFormSelectOption } from '@/types';
import type { FormSelectProps } from './types';

const FormGender: React.FC<Omit<FormSelectProps, 'options'>> = ({
  ...props
}) => {
  const options: IFormSelectOption[] = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ];
  return <FormSelect options={options} {...props} />;
};

export default FormGender;
