"use client";

import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/api/_services/GlobalApi";
import AddNewStudent from "./_component/AddNewStudent";
import StudentListTable from "./_component/StudentListTable";
import { toast } from "react-toastify";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    loadStudents();
    loadGrades();
  }, []);

  const loadStudents = async () => {
    const res = await GlobalApi.GetAllStudents();
    setStudents(res.data);
  };

  const loadGrades = async () => {
    const res = await GlobalApi.GetAllGrades();
    setGrades(res.data);
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await GlobalApi.DeleteStudent(id);
      toast.success("Student deleted successfully!");
      loadStudents();
    } catch (error) {
      toast.error(error.message || "Failed to save student");
    }
  };

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase());
    const matchGrade = selectedGrade === "" || s.grade === selectedGrade;
    return matchSearch && matchGrade;
  });

  return (
    <div className="p-4 md:p-7 bg-transparent transition-colors duration-300">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">Students</h2>

      {/* Responsive Header Container */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="w-full sm:w-fit bg-blue-700 dark:bg-blue-800 text-white px-6 py-3 rounded-lg font-bold text-center shadow-sm">
          Total Students: {filtered.length}
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <select
              className="border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-md text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
              value={selectedGrade}
              onChange={(e) => {
                setSelectedGrade(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Classes</option>
              {grades.map((g) => (
                <option key={g.id} value={g.grade}>
                  {g.grade}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search name or ID..."
              className="border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-md w-full md:w-64 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="w-full md:w-auto">
            <AddNewStudent afterAdd={loadStudents} />
          </div>
        </div>
      </div>

      <StudentListTable
        students={filtered}
        handleDelete={handleDelete}
        page={page}
        pageSize={pageSize}
        totalPages={Math.ceil(filtered.length / pageSize)}
        setPage={setPage}
        reloadStudents={loadStudents}
      />
    </div>
  );
}

export default StudentsPage;