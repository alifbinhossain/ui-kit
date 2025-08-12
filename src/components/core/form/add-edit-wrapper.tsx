import React, { useEffect } from 'react';

import { Form } from '@/components/ui/form';
import CoreForm from '@/components/core/form';

import { DevTool } from '@/lib/react-hook-devtool';

import type { IFormAddEditWrapperProps } from './types';

const FormAddEditWrapper: React.FC<IFormAddEditWrapperProps> = ({
  children,
  form,
  onSubmit,
  title,
  isSubmitDisable = false,
}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {children}
        <CoreForm.Submit
          className='w-full'
          title='Save'
          isSubmitDisable={isSubmitDisable}
        />
        <DevTool control={form.control} placement='top-left' />
      </form>
    </Form>
  );
};

export default FormAddEditWrapper;
