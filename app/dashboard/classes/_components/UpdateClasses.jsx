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

function UpdateClasses({ classData, afterUpdate }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (classData) { reset({ grade: classData.grade || "" }); }
  }, [classData, reset]);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      await GlobalApi.UpdateGrade(classData.id, formData);
      toast.success("Class updated successfully");
      afterUpdate();
      setOpen(false);
    } catch (err) { toast.error("Update failed"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-blue-700 dark:text-blue-400 hover:scale-110 transition-transform">
        <Pencil size={20} />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[400px] rounded-lg dark:bg-slate-900 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="dark:text-slate-100">Update Class</DialogTitle>
            <DialogDescription className="dark:text-slate-400">Modify class details and save changes.</DialogDescription>
          </DialogHeader>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Class Name</label>
              <Input 
                {...register("grade", { required: true })} 
                placeholder="Enter class name" 
                className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" className="dark:border-slate-700 dark:text-slate-300" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={loading} className="dark:bg-blue-700 dark:text-white">
                {loading ? <LoaderIcon className="animate-spin" /> : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateClasses;