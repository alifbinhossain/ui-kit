import { useContext } from 'react';
import { TableContextSSR } from '@/providers/table-provider-ssr';

const useTableSSR = () => {
  const context = useContext(TableContextSSR);

  if (!context) {
    throw new Error(
      'useTableServer must be used within an TableProviderServer'
    );
  }

  return context;
};

export default useTableSSR;
