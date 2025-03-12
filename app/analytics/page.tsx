import SideNav from '@/components/ui/SideNav';
import React from 'react';

export default function Page() {
  return (
    <main className='flex flex-row'>
        <SideNav />
        <div className='bg-blue-50 flex-1 p-4'>
            <h1>Analytics Content</h1>
        </div>
    </main>
  );
}