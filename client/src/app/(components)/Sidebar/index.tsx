"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  Boxes,
    Heart,
    LayoutDashboard,
    LucideIcon,
    Menu,
    MessagesSquare,
    Rows3,
    Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        ${!isActive ? "hover:text-blue-500 hover:bg-blue-100" : ""}
        gap-3 transition-colors ${
          isActive ? "bg-blue-500 text-white rounded-full" : "rounded-full text-gray-700"
        }
      my-4 }`}
      >
        <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-700"}`} />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium ${isActive ? "text-white" : "text-gray-700"}`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};



const Sidebar = () => {

    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    }

    const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? 'w-0 md:w-24' : 'w-72 md:w-64'} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

    return (
        <div className={sidebarClassNames}>
            {/* TOP LOGO */}
            <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
                <div><Boxes className="cursor-pointer text-blue-500" size={48} /></div>
                <h1 className={`${isSidebarCollapsed ? 'hidden' : 'block'} font-semibold text-2xl text-blue-500`}>DormDash</h1>
                <button className='md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={toggleSidebar}>
                    <Menu className='w-4 h-4' />
                </button>
            </div>

            {/* LINKS */}
            <div className="flex-grow mt-8 px-4">
                <SidebarLink
                href="/dashboard"
                icon={LayoutDashboard}
                label="Dashboard"
                isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                href="/marketplace"
                icon={Search}
                label="Marketplace"
                isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                href="/messages"
                icon={MessagesSquare}
                label="Messages"
                isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                href="/listings"
                icon={Rows3}
                label="My Listings"
                isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                href="/saved"
                icon={Heart}
                label="Saved"
                isCollapsed={isSidebarCollapsed}
                />
            </div>

            {/* FOOTER */}
            <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
                <p className="text-center text-xs text-gray-500">&copy; 2024 DormDash</p>
            </div>
        </div>
    );
};

export default Sidebar;