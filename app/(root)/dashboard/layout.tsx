import SideNav from '@/components/shared/SideNav';
import { SignedIn } from '@clerk/nextjs';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SignedIn>
      <div className='flex h-screen'>
        {/* Sidebar for larger screens */}
        <div className='md:w-64 h-full md:block hidden'>
          <SideNav />
        </div>

        <div className='flex-1 bg-gray-100  h-full overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
          <div className='overflow-y-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            {children}
          </div>
        </div>
      </div>
    </SignedIn>
  );
};

export default Layout;
