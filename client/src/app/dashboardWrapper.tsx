import React from 'react'
import Navbar from "@/app/(components)/Navbar";
import Sidebar from '@/app/(components)/Sidebar';


const DashboardWrapper = ( { children } : { children: React.ReactNode }) => {
  return (
    <div className ={` light flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
        <Sidebar />
        <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 md:pl-24`}>
            <Navbar />
            {children}
        </main>
    </div>
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