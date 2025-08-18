import { createContext, useMemo } from 'react';

export interface IAppContext {
  apiBaseUrl: string;
  imageApiBaseUrl: string;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

const AppProvider: React.FC<{
  children: React.ReactNode;
  apiBaseUrl: string;
  imageApiBaseUrl: string;
}> = ({ children, apiBaseUrl, imageApiBaseUrl }) => {
  const value = useMemo(
    (): IAppContext => ({
      apiBaseUrl,
      imageApiBaseUrl,
    }),
    [apiBaseUrl, imageApiBaseUrl]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
