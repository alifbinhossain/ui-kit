import { createContext, useMemo, useState } from 'react';
import { type IRoute } from '@/types';
import { useLocation } from 'react-router-dom';
import useApp from '@/hooks/useApp';

export interface ISidebarContext {
  path: ReturnType<typeof useLocation>;
  isCloseAll: boolean;
  setIsCloseAll: React.Dispatch<React.SetStateAction<boolean>>;
  routes: IRoute[];
  setRoutes: React.Dispatch<React.SetStateAction<IRoute[]>>;
  openRoutes: IRoute[];
  setOpenRoutes: React.Dispatch<React.SetStateAction<IRoute[]>>;
  sidebarRoutes: IRoute[];
}

export const SidebarContext = createContext({} as ISidebarContext);

interface ISidebarProviderProps {
  children: React.ReactNode;
}

const SidebarProvider: React.FC<ISidebarProviderProps> = ({ children }) => {
  const path = useLocation();
  const { sidebarRoutes } = useApp();
  const [isCloseAll, setIsCloseAll] = useState(false);
  const [openRoutes, setOpenRoutes] = useState<IRoute[]>([]);
  const [routes, setRoutes] = useState<IRoute[]>(sidebarRoutes);

  const value = useMemo((): ISidebarContext => {
    return {
      path,
      isCloseAll,
      setIsCloseAll,
      routes,
      setRoutes,
      openRoutes,
      setOpenRoutes,
      sidebarRoutes,
    };
  }, [path, isCloseAll, routes, openRoutes, sidebarRoutes]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export default SidebarProvider;
