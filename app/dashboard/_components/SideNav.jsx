"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../../_context/AuthContext";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Hand,
  LayoutDashboard,
  School,
  Settings,
  TrendingUp,
  X 
} from "lucide-react";

export default function SideNav() {
  const pathname = usePathname();
  const { user, isSideNavOpen, toggleSideNav } = useAuth();

  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: 2, name: "Students", icon: GraduationCap, path: "/dashboard/students" },
    { id: 3, name: "Attendance", icon: Hand, path: "/dashboard/attendance" },
    { id: 4, name: "Classes", icon: School, path: "/dashboard/classes" },
    { id: 5, name: "Reports", icon: TrendingUp, path: "/dashboard/report" },
    { id: 6, name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <>
      {isSideNavOpen && (
        <div className="fixed inset-0 bg-black/50 z-[55] lg:hidden" onClick={toggleSideNav} />
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-[60] w-64 flex flex-col h-full border-r shadow-sm
        transition-all duration-300 transform
        bg-gray-50 text-gray-800 border-gray-200 
        dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800
        ${isSideNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        <div className="p-5 border-b flex justify-between items-center  lg:bg-transparent dark:border-slate-800">
          <Image src="/logo.svg" width={140} height={40} alt="Logo" className="w-auto h-auto dark:brightness-200" />
          <button onClick={toggleSideNav} className="lg:hidden py-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-xl transition-colors text-gray-300">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuList.map((menu) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.path;
            return (
              <Link
                key={menu.id}
                href={menu.path}
                onClick={() => { if(window.innerWidth < 1024) toggleSideNav(); }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm
                  ${isActive 
                    ? "bg-blue-100 text-blue-700 font-bold dark:bg-blue-900/30 dark:text-blue-400" 
                    : "hover:bg-blue-50 text-gray-600 dark:hover:bg-slate-800 dark:text-slate-400"}`}
              >
                <Icon size={18} />
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>

        {user && (
          <div className="p-4 border-t mt-auto border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4 p-1">
              <div className="relative w-10 h-10 flex-shrink-0 border-2 rounded-full overflow-hidden border-white dark:border-slate-700">
                <Image src={user.image || "/userTemp.svg"} fill alt="User" className="object-cover" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate text-gray-800 dark:text-slate-200">{user.name}</p>
                <p className="text-[10px] text-gray-500 dark:text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        )}
      </div>
    </>
  );
}