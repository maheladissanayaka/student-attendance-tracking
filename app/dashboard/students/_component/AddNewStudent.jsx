"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GlobalApi from "../../../api/_services/GlobalApi";
import { LoaderIcon } from "lucide-react";

function AddNewStudent({afterAdd}) {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setloading]= useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const GetAllGrades = async () => {
    try {
      const res = await GlobalApi.GetAllGrades();
      setGrades(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setGrades([]);
    }
  };

  useEffect(() => { GetAllGrades(); }, []);

  const onSubmit = async (data) => {
    try {
      setloading(true);
      await GlobalApi.AddNewStudent(data);
      toast.success("Student added successfully!");
      reset();
      setloading(false);
      setOpen(false);
      afterAdd?.();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to save student");
      setloading(false);
    }
  };

  return (
    <div className="w-full md:w-auto">
      <Button 
        className='w-full bg-black dark:bg-slate-100 text-white dark:text-slate-900 border-white dark:border-slate-800 border-2 hover:bg-white dark:hover:bg-slate-200 hover:text-black transition-colors' 
        onClick={() => setOpen(true)}
      >
        + Add New Student
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-[500px] rounded-xl max-h-[90vh] overflow-y-auto dark:bg-slate-900 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="dark:text-slate-100">Add New Student</DialogTitle>
            <DialogDescription className="dark:text-slate-400">
              Enter student details below. Click save when you’re done.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4 mt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label className="text-sm font-medium dark:text-slate-300">Full Name</label>
                  <Input 
                    placeholder="Ex. John Carry" 
                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    {...register("name", { required: "Name is required" })} 
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
               </div>
               <div>
                  <label className="text-sm font-medium dark:text-slate-300">Student ID</label>
                  <Input 
                    placeholder="STU-001" 
                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    {...register("studentId", { required: true })} 
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label className="text-sm font-medium dark:text-slate-300">Email</label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    {...register("email")} 
                  />
               </div>
               <div>
                  <label className="text-sm font-medium dark:text-slate-300">Phone</label>
                  <Input 
                    type="tel" 
                    placeholder="07X XXX XXXX" 
                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    {...register("phone")} 
                  />
               </div>
            </div>

            <div>
              <label className="text-sm font-medium dark:text-slate-300">Grade</label>
              <select 
                className="w-full border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100" 
                {...register("gradeId", { required: true })}
              >
                <option value="">Select Grade</option>
                {grades.map((g) => (<option key={g.id} value={g.id}>{g.grade}</option>))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium dark:text-slate-300">Address</label>
              <textarea 
                className="w-full border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100" 
                rows={2} 
                {...register("address")} 
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" className="dark:border-slate-700 dark:text-slate-300" onClick={() => reset()}>Clear</Button>
              <Button type="submit" disabled={loading} className="dark:bg-blue-700">
                { loading ? <LoaderIcon className="animate-spin"/> : 'Save Student' }
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;