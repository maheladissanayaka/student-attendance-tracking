"use client";

import React, { useState, useEffect, useRef } from "react"; // Added useRef and useEffect
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../_context/AuthContext";
import {
  UserCircle,
  ChevronDown,
  Users,
  ShieldCheck,
  BadgeCheck,
  Menu,
  Megaphone,
  Settings,
} from "lucide-react";

function Header() {
  const { user, toggleSideNav } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown container

  // Function to close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="h-16 shadow-sm w-full bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSideNav}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg lg:hidden text-gray-600 dark:text-slate-400 transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <h1 className="text-sm md:text-lg font-bold text-gray-800 dark:text-slate-100 tracking-tight">
            EduTrack{" "}
            <span className="text-blue-600 font-medium hidden sm:inline">
              | School System
            </span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden sm:block text-right">
          <div className="flex items-center gap-1 justify-end">
            <p className="text-sm font-bold text-gray-800 dark:text-slate-200 capitalize leading-none">
              {user ? user.name : "..."}
            </p>
            {user?.role === "ADMIN" && (
              <BadgeCheck size={14} className="text-blue-500" />
            )}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
            {user?.role || "Staff"}
          </p>
        </div>

        {/* --- ATTACHED REF TO THIS CONTAINER --- */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 p-1 md:p-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-2xl transition-all border border-gray-100 dark:border-slate-800 active:scale-95"
          >
            <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden bg-blue-100 dark:bg-slate-800">
              <Image
                src={user?.image || "/userTemp.svg"}
                fill
                alt="User Profile"
                className="object-cover"
              />
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform duration-300 ${
                openDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown && (
            <div className="absolute right-0 mt-3 w-64 sm:w-60 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              {/* Dropdown Content */}
              <div className="px-4 py-3 border-b border-gray-50 dark:border-slate-800 sm:hidden bg-gray-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-200 capitalize truncate">
                    {user?.name || "User"}
                  </p>
                  {user?.role === "ADMIN" && (
                    <BadgeCheck size={14} className="text-blue-500" />
                  )}
                </div>
                <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase">
                  {user?.role || "Staff"}
                </p>
              </div>

              <div className="px-3 py-2">
                <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase px-3 mb-1">
                  General
                </p>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setOpenDropdown(false)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all active:scale-95"
                >
                  <UserCircle size={20} />
                  <span className="font-medium">Profile Details</span>
                </Link>
                <Link
                  href="/dashboard/social"
                  onClick={() => setOpenDropdown(false)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all active:scale-95"
                >
                  <Megaphone size={20} />
                  <span className="font-medium">Announcements</span>
                </Link>
              </div>

              {user?.role === "ADMIN" && (
                <div className="px-3 py-2 mt-1 border-t border-gray-50 dark:border-slate-800">
                  <p className="text-[10px] font-black text-blue-500 uppercase px-3 mt-2 mb-1">
                    Administration
                  </p>
                  <Link
                    href="/dashboard/users"
                    onClick={() => setOpenDropdown(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all active:scale-95"
                  >
                    <Users size={20} />
                    <span className="font-medium">User Management</span>
                  </Link>
                  <Link
                    href="/dashboard/school-settings"
                    onClick={() => setOpenDropdown(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all active:scale-95"
                  >
                    <Settings size={20} />
                    <span className="font-medium">School Management</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;