import { useContext } from 'react';
import { TableContext } from '@/providers/table-provider';

const useTable = () => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTable must be used within an TableProvider');
  }

  return context;
};

export default useTable;
