"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { LoaderIcon } from "lucide-react";
import GlobalApi from "@/app/api/_services/GlobalApi";

function AddNewClasses({ afterAdd }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await GlobalApi.AddNewClass(data);
      toast.success("Class added successfully!");
      reset();
      setOpen(false);
      afterAdd?.();
    } catch (err) { toast.error("Failed to add class"); }
    finally { setLoading(false); }
  };

  return (
    <div className="w-full">
      <Button 
        className='w-full sm:w-auto bg-black dark:bg-slate-100 text-white dark:text-slate-900 border-white dark:border-slate-800 border-2 hover:bg-white dark:hover:bg-slate-200 hover:text-black transition-colors' 
        onClick={() => setOpen(true)}
      >
        + Add New Class
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[400px] rounded-lg dark:bg-slate-900 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="dark:text-slate-100">Add New Class</DialogTitle>
            <DialogDescription className="dark:text-slate-400">Enter class details below and save.</DialogDescription>
          </DialogHeader>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm font-medium dark:text-slate-300">Class Name</label>
              <Input
                placeholder="Ex: Grade 10"
                className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                {...register("grade", { required: "Class name is required" })}
              />
              {errors.grade && <p className="text-xs text-red-500 mt-1">{errors.grade.message}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" className="dark:border-slate-700 dark:text-slate-300" onClick={() => reset()}>Clear</Button>
              <Button type="submit" disabled={loading} className="dark:bg-blue-700 dark:text-white">
                {loading ? <LoaderIcon className="animate-spin" /> : "Save Class"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewClasses;