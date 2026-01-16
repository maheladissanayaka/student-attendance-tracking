"use client";

import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/api/_services/GlobalApi";
import AddNewClasses from "./_components/AddNewClasses";
import ClassesListTable from "./_components/ClassesListTable";
import { toast } from "react-toastify";

function StudentClassesPage() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const loadClasses = async () => {
    try {
      const res = await GlobalApi.GetAllGrades();
      setClasses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load classes");
      setClasses([]);
    }
  };

  useEffect(() => { loadClasses(); }, []);

  const handleDelete = async (id) => {
    try {
      await GlobalApi.DeleteGrade(id);
      toast.success("Class deleted successfully");
      loadClasses();
    } catch (err) { toast.error("Delete failed"); }
  };

  const filteredClasses = classes.filter((c) =>
    c.grade?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClasses.length / pageSize);

  return (
    <div className="p-4 md:p-7 bg-transparent">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">Classes</h2>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="bg-blue-700 dark:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-bold text-sm md:text-base shadow-sm">
          Total Classes: {filteredClasses.length}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search class..."
            className="border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-md w-full md:w-64 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <div className="w-full sm:w-auto">
            <AddNewClasses afterAdd={loadClasses} />
          </div>
        </div>
      </div>

      <ClassesListTable
        classes={filteredClasses}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        setPage={setPage}
        handleDelete={handleDelete}
        reloadClasses={loadClasses}
      />
    </div>
  );
}

export default StudentClassesPage;