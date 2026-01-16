"use client";

import React, { useEffect, useState } from "react";
import { UserPlus, Users as UsersIcon, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import UserList from "./_components/UserList";
import AddUserForm from "./_components/AddUserForm";
import { useAuth } from "@/app/_context/AuthContext";
import GlobalApi from "@/app/api/_services/GlobalApi";

export default function UserManagement() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await GlobalApi.GetAllUsers();
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users from the database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "ADMIN") {
      fetchUsers();
    }
  }, [currentUser]);

  if (currentUser?.role !== "ADMIN") {
    return (
      <div className="p-10 text-center font-bold text-red-500 bg-red-50 dark:bg-red-900/10 rounded-2xl m-6">
        Access Denied: Administrative privileges required.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 space-y-6 animate-in fade-in duration-500 bg-transparent">
      {/* Header - Stacks on mobile, row on tablet/desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-slate-100 flex items-center gap-2">
            <UsersIcon className="text-blue-600 dark:text-blue-400" /> User Management
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm">Monitor staff activity, update roles, or register new accounts.</p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={fetchUsers}
            disabled={loading}
            className="flex-1 sm:flex-none flex items-center justify-center p-2.5 text-gray-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-800"
            title="Refresh User Data"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-3 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 dark:shadow-none transition-all active:scale-95 whitespace-nowrap"
          >
            <UserPlus size={18} /> Register Staff
          </button>
        </div>
      </div>

      <UserList users={users} refresh={fetchUsers} />

      {showAddModal && (
        <AddUserForm 
          onClose={() => setShowAddModal(false)} 
          onSuccess={() => {
            setShowAddModal(false);
            fetchUsers();
          }} 
        />
      )}
    </div>
  );
}