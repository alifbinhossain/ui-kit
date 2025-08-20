import { createContext, useMemo } from 'react';

import type { IRoute } from '@/types';
import { Toaster } from 'sonner';

export interface IAppContext {
  companyTitle: string;
  apiBaseUrl: string;
  imageApiBaseUrl: string;
  sidebarRoutes: IRoute[];
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

const AppProvider: React.FC<{
  children: React.ReactNode;
  apiBaseUrl: string;
  imageApiBaseUrl: string;
  sidebarRoutes: IRoute[];
  companyTitle: string;
}> = ({
  children,
  apiBaseUrl,
  imageApiBaseUrl,
  sidebarRoutes,
  companyTitle,
}) => {
  const value = useMemo(
    (): IAppContext => ({
      apiBaseUrl,
      imageApiBaseUrl,
      sidebarRoutes,
      companyTitle,
    }),
    [apiBaseUrl, imageApiBaseUrl, sidebarRoutes, companyTitle]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
      <Toaster richColors position={'top-center'} expand={true} />
    </AppContext.Provider>
  );
};

export default AppProvider;
