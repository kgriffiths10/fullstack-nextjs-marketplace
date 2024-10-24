"use client";

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';
import { Bell, Menu, Moon, Settings, Sun, User } from 'lucide-react';
import Link from 'next/link'; // Use next/link for navigation
import React from 'react'


const Navbar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
      (state) => state.global.isSidebarCollapsed
    );
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  
    const toggleSidebar = () => {
      dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    };
  
    const toggleDarkMode = () => {
      dispatch(setIsDarkMode(!isDarkMode));
    };

    return (
        <div className='flex justify-between items-center w-full mb-7'>
            {/* NAVBAR LEFT SIDE */}

            <div className='flex flex-row gap-8 items-center'>
                <button className='px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={toggleSidebar}>
                    <Menu className='w-4 h-4' />  
                </button>
                <div>
                    <div className='text-xl font-semibold'>Welcome Back, John</div>
                    <div>Toronto University</div> 
                </div>
            </div>

            {/* NAVBAR RIGHT SIDE */}

            <div className='flex justify-between items-center gap-5'>
                <div className='hidden md:flex justify-between items-center gap-5'>
                    <div>
                        <button onClick={toggleDarkMode}>
                        {isDarkMode ? (
                            <Sun className="cursor-pointer text-gray-500" size={24} />
                        ) : (
                            <Moon className="cursor-pointer text-gray-500" size={24} />
                        )}
                        </button>
                    </div>
                    <div className='relative'>
                        <Bell className='cursor-pointer text-gray-500' size={24}/>
                        <span className='absolute -top-2 -right-2 inline-flex items-center justify px-[0.4rem] py-1 text-xs fony-semibold leading-none text-red-100 bg-red-400 rounded-full'>
                            2
                        </span>
                    </div>
                    <hr className='w-0 h-7 border border-solid border-l border-gray-300 mx-3' />
                    <div className='flex items-center gap-3 cursor-pointer'>
                        <div className='w-9 h-9'><User className="cursor-pointer text-gray-500" size={24} /></div>
                        <span className='font-semibold'>John Doe</span>
                    </div>
                </div>
                <Link href="/settings">
                    <Settings className="cursor-pointer text-gray-500" size={24} />
                </Link>
            </div>
        </div>
    )
}

export default Navbar;