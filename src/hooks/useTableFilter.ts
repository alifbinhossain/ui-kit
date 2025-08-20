import { useContext } from 'react';

import { TableFilterContext } from '@/providers/table-filter-provider';

const useTableFilter = () => {
  const context = useContext(TableFilterContext);

  if (!context) {
    throw new Error(
      'useTableFilter must be used within an TableFilterProvider'
    );
  }

  return context;
};

export default useTableFilter;
