"use client";

import { useState, useEffect } from "react";
import GlobalApi from "@/app/api/_services/GlobalApi";
import { UserCircle, ShieldCheck } from "lucide-react";
import UpdateProfileForm from "./_components/UpdateProfileForm";
import ChangePasswordForm from "./_components/ChangePasswordForm";
import ProfileImageUploader from "./_components/ProfileImageUploader";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    setLoading(true);
    GlobalApi.GetUserContext()
      .then((res) => { setUser(res.data.user); })
      .catch((err) => { toast.error("Failed to load profile data."); })
      .finally(() => setLoading(false));
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500 dark:text-slate-400">Loading profile...</div>
    );

  return (
    /* FIX: h-[calc(100vh-64px)] ensures the height is limited to the viewport minus the Header.
       overflow-y-auto enables scrolling only within this container.
    */
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="border-b border-gray-100 dark:border-slate-800 pb-4">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-slate-100 tracking-tight">
            Account Settings
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm">
            Update your information and keep your account secure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Card: Image Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center lg:sticky lg:top-4 transition-colors">
              <ProfileImageUploader
                currentImage={user?.image || "/userTemp.svg"}
                onUploadSuccess={(url) => setUser((prev) => ({ ...prev, image: url }))}
              />
              <h2 className="mt-6 font-bold text-xl text-gray-800 dark:text-slate-100 capitalize text-center">
                {user?.name || "Member Name"}
              </h2>
              <div className="mt-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
                <p className="text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest">
                  {user?.role || "Staff"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Information Card */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 transition-all hover:shadow-md">
              <div className="flex items-center gap-2 mb-6 text-blue-600 dark:text-blue-400">
                <UserCircle size={20} />
                <h3 className="font-bold text-gray-800 dark:text-slate-100">General Information</h3>
              </div>
              <UpdateProfileForm
                initialName={user?.name}
                email={user?.email}
                onUpdateSuccess={(newName) => setUser((prev) => ({ ...prev, name: newName }))}
              />
            </div>

            {/* Security Card */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 transition-all hover:shadow-md">
              <div className="flex items-center gap-2 mb-6 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={20} />
                <h3 className="font-bold text-gray-800 dark:text-slate-100">Security & Privacy</h3>
              </div>
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}