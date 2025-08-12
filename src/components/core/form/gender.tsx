import FormSelect from './select';
import type { FormSelectProps, IFormSelectOption } from './types';

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
