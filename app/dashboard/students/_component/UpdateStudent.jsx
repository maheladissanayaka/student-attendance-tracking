"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import GlobalApi from "@/app/api/_services/GlobalApi";
import { toast } from "react-toastify";
import { LoaderIcon, Pencil } from "lucide-react";

function UpdateStudent({ student, afterUpdate }) {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (student && grades.length > 0) {
      reset({
        name: student.name || "",
        email: student.email || "",
        studentId: String(student.studentId || ""),
        phone: student.phone || "",
        address: student.address || "",
        gradeId: String(student.gradeId || ""),
      });
    }
  }, [student, grades, reset]);

  useEffect(() => {
    GlobalApi.GetAllGrades().then((res) => setGrades(res.data));
  }, []);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      await GlobalApi.UpdateStudent(student.id, formData);
      toast.success("Student updated successfully");
      afterUpdate();
      setOpen(false);
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-blue-700 dark:text-blue-400 hover:scale-110 transition-transform">
        <Pencil size={20} />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-[500px] rounded-xl max-h-[90vh] overflow-y-auto dark:bg-slate-900 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="dark:text-slate-100">Update Student</DialogTitle>
            <DialogDescription className="dark:text-slate-400">Modify student details and save changes.</DialogDescription>
          </DialogHeader>

          <form className="space-y-4 mt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                <Input {...register("name")} placeholder="Enter full name" className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Student ID</label>
                <Input {...register("studentId")} placeholder="Enter student ID" className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                <Input type="email" {...register("email")} placeholder="Enter email" className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                <Input {...register("phone")} placeholder="Enter phone number" className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Grade</label>
              <select {...register("gradeId")} className="w-full border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-100 outline-none">
                <option disabled value="">Select grade</option>
                {grades.map((g) => (<option key={g.id} value={String(g.id)}>{g.grade}</option>))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Address</label>
              <textarea className="w-full border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-100 outline-none" rows={2} {...register("address")} placeholder="Enter address" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" className="dark:border-slate-700 dark:text-slate-300" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={loading} className="dark:bg-blue-700">
                {loading ? <LoaderIcon className="animate-spin" /> : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateStudent;