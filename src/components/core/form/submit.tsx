import { RotateCw } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button, type ButtonProps } from '@/components/ui/button';

const FormSubmit: React.FC<
  ButtonProps & {
    title?: string;
    isSubmitDisable?: boolean;
  }
> = ({ title = 'Submit', ...props }) => {
  const {
    formState: { isSubmitting, isDirty },
  } = useFormContext();
  return (
    <Button
      aria-label='Submit Form'
      disabled={!isDirty || isSubmitting || props.isSubmitDisable}
      type='submit'
      {...props}
    >
      {isSubmitting && <RotateCw className='mr-2 h-4 w-4 animate-spin' />}
      {isSubmitting ? `Please wait...` : title}
    </Button>
  );
};

export default FormSubmit;
