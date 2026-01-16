"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import UpdateStudent from "./UpdateStudent";
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

function StudentListTable({ students, handleDelete, page, pageSize, totalPages, setPage, reloadStudents }) {
  const paginated = students.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mt-4">
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
        <table className="w-full border-collapse bg-white dark:bg-slate-900 min-w-[900px]">
          <thead className="bg-black dark:bg-slate-950 text-white">
            <tr>
              <th className="p-4 text-left text-sm font-bold uppercase tracking-wider">Name</th>
              <th className="p-4 text-center text-sm font-bold uppercase tracking-wider">ID</th>
              <th className="p-4 text-center text-sm font-bold uppercase tracking-wider">Class</th>
              <th className="p-4 text-center text-sm font-bold uppercase tracking-wider">Email</th>
              <th className="p-4 text-center text-sm font-bold uppercase tracking-wider">Phone</th>
              <th className="p-4 text-center text-sm font-bold uppercase tracking-wider">Address</th>
              <th className="p-4 text-center text-sm font-bold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
            {paginated.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-200">{s.name}</td>
                <td className="p-4 text-center text-sm text-gray-600 dark:text-slate-400">{s.studentId}</td>
                <td className="p-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">{s.grade}</td>
                <td className="p-4 text-center text-sm text-slate-600 dark:text-slate-400">{s.email || "-"}</td>
                <td className="p-4 text-center text-sm text-slate-600 dark:text-slate-400">{s.phone || "-"}</td>
                <td className="p-4 text-center text-sm truncate max-w-[150px] text-slate-500 dark:text-slate-400">{s.address || "-"}</td>
                <td className="p-4 flex gap-4 justify-center">
                  <UpdateStudent student={s} afterUpdate={reloadStudents} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[95vw] max-w-md rounded-xl dark:bg-slate-900 dark:border-slate-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="dark:text-slate-100">Delete Record?</AlertDialogTitle>
                        <AlertDialogDescription className="dark:text-slate-400">
                          This will permanently remove the record for {s.name}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="dark:border-slate-700 dark:text-slate-300">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(s.id)} className="bg-red-600 text-white">
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr><td colSpan={7} className="p-10 text-center text-gray-400 dark:text-slate-500">No students found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2 justify-center md:justify-end mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 text-sm border rounded-lg transition-all ${
              page === i + 1 
                ? "bg-blue-700 text-white border-blue-700 shadow-md" 
                : "bg-white dark:bg-slate-900 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StudentListTable;