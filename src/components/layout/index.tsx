import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from './navbar';
import Sidebar from './sidebar';
import { LayoutProvider } from '@/providers';

const Layout = () => {
  return (
    <LayoutProvider>
      <div className='relative flex h-screen w-screen overflow-hidden'>
        <Sidebar />
        <main className='flex size-full flex-1 flex-col overflow-hidden'>
          <Navbar />
          <div className='flex size-full flex-1 flex-col overflow-hidden'>
            <div className='size-full flex-1 overflow-auto px-3 py-2.5 lg:px-6 lg:py-3.5'>
              <Suspense fallback='loading...'>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </LayoutProvider>
  );
};

export default Layout;
