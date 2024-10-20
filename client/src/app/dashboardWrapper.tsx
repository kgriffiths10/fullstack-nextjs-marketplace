"use client";

import React, { useEffect } from 'react'
import Navbar from "@/app/(components)/Navbar";
import Sidebar from '@/app/(components)/Sidebar';
import { Store } from 'lucide-react';
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ( { children } : { children: React.ReactNode }) => {
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.add('light');
        }
    });

    return (
      <div className ={` ${isDarkMode ? 'dark' : 'light'} flex bg-gray-100 text-gray-900 w-full min-h-screen`}>
          <Sidebar />
          <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-100 ${isSidebarCollapsed ? 'md:pl-32' : 'md:pl-72'}`}>
              <Navbar />
              {children}
          </main>
      </div>
    )
  }


const DashboardWrapper = ( { children } : { children: React.ReactNode }) => {
  return (
    <StoreProvider>
        <DashboardLayout>
            {children}
        </DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper


/* Learning Notes

    - Purpose:  The DashboardWrapper component is a specialized wrapper for dashboard-related pages or components. It allows you to 
                encapsulate specific styles or functionality that are relevant only to the dashboard area of your application.
    - Importing path as (components) with ( ) is a way to import components from the src/components directory without the components being considered a url.
        - Ex:   - app > dashboard > pages.tsx, the dashboard will be an extension of the url (localhost:3000/dashboard) and it will look at its page.tsx file.
                - (components) if added to localhost url as extension wont register as a route.

*/