import SideNav from '@/components/ui/SideNav'
import React from 'react'

export default function Page() {
  return (
    <main className='flex flex-row'>
        <SideNav />
        <div className='bg-blue-50 flex-1'>
            {/* Dashboard Content Here */}
        </div>
    </main>
  );
}
