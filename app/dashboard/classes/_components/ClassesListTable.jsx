"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import UpdateClasses from "./UpdateClasses";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ClassesListTable({ classes, handleDelete, page, pageSize, totalPages, setPage, reloadClasses }) {
  const paginated = classes.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mt-4">
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
        <table className="w-full border-collapse bg-white dark:bg-slate-900">
          <thead className="bg-black dark:bg-slate-950 text-white">
            <tr>
              <th className="p-4 text-left text-sm font-bold uppercase tracking-wider">Class Name</th>
              <th className="p-4 text-center text-sm font-bold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {paginated.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-200">{c.grade}</td>
                <td className="p-4 flex gap-4 justify-center">
                  <UpdateClasses classData={c} afterUpdate={reloadClasses} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[95vw] sm:max-w-md rounded-lg dark:bg-slate-900 dark:border-slate-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="dark:text-slate-100">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="dark:text-slate-400">This will permanently delete this class.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="dark:border-slate-700 dark:text-slate-300">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(c.id)}
                          className="bg-red-600 text-white hover:bg-red-700"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr><td colSpan={2} className="p-10 text-center text-slate-400 dark:text-slate-500">No classes found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2 justify-center md:justify-end mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded-lg text-sm transition-all ${
              page === i + 1 
                ? "bg-blue-700 text-white shadow-md border-blue-700" 
                : "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ClassesListTable;