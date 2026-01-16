"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trash2, Shield, ChevronDown, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import GlobalApi from "@/app/api/_services/GlobalApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function UserList({ users, refresh }) {
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (userId, updateData) => {
    try {
      const res = await GlobalApi.UpdateUser(userId, updateData);
      if (res.data.success) {
        toast.success("User updated successfully");
        await refresh(); 
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const triggerDelete = (user) => {
    setUserToDelete(user);
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await GlobalApi.DeleteUser(userToDelete.id);
      toast.success("User deleted successfully");
      await refresh();
      setOpen(false);
    } catch (error) {
      toast.error("Delete operation failed");
    } finally {
      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Staff Member</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {users && users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm bg-gray-100 dark:bg-slate-800">
                      <Image src={u.image || "/userTemp.svg"} fill className="object-cover" alt="Profile" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-slate-200 text-sm">{u.name}</p>
                      <p className="text-xs text-gray-400 dark:text-slate-500">{u.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="relative inline-block w-32">
                    <select
                      value={u.role}
                      onChange={(e) => handleUpdate(u.id, { role: e.target.value })}
                      className={`appearance-none w-full px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all outline-none border-none ring-1 ${
                        u.role === "ADMIN" 
                          ? "bg-purple-50 text-purple-600 ring-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:ring-purple-900/50" 
                          : "bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-900/50"
                      }`}
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="TEACHER">TEACHER</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 dark:text-slate-400" />
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="relative inline-block w-32">
                    <select
                      value={u.status}
                      onChange={(e) => handleUpdate(u.id, { status: e.target.value })}
                      className={`appearance-none w-full px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all outline-none border-none ring-1 ${
                        u.status === "ACTIVE" 
                          ? "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-900/50" 
                          : "bg-gray-100 text-gray-500 ring-gray-200 dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-700"
                      }`}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 dark:text-slate-400" />
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => triggerDelete(u)}
                    className="p-2 text-gray-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[400px] rounded-3xl dark:bg-slate-900 dark:border-slate-800">
          <DialogHeader className="flex flex-col items-center">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-2">
                <AlertCircle className="text-red-500 dark:text-red-400" size={24} />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-800 dark:text-slate-100">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-center text-gray-500 dark:text-slate-400">
              Are you sure you want to delete <span className="font-bold text-gray-800 dark:text-slate-200">{userToDelete?.name}</span>? 
              This action cannot be undone and will remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-2 justify-center mt-4">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="rounded-xl border-gray-200 dark:border-slate-700 flex-1 dark:text-slate-300"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={isDeleting}
              className="rounded-xl bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 flex-1"
            >
              {isDeleting ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}