"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Camera, Loader2, User } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../../_context/AuthContext";
import GlobalApi from "@/app/api/_services/GlobalApi";

export default function ProfileImageUploader({ currentImage, onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);
  const fileInputRef = useRef(null);
  const { refreshUser } = useAuth();

  useEffect(() => { setPreview(currentImage); }, [currentImage]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await GlobalApi.UploadProfileImage(formData);
      if (res.data.success) {
        onUploadSuccess(res.data.imageUrl);
        await refreshUser();
        toast.success("Photo updated!");
      }
    } catch (err) {
      toast.error("Upload failed.");
      setPreview(currentImage);
    } finally { setIsUploading(false); }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group w-28 h-28 md:w-32 md:h-32">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-50 dark:border-slate-800 bg-gray-100 dark:bg-slate-800 flex items-center justify-center relative shadow-inner transition-colors">
          {preview ? (
            <Image src={preview} alt="Avatar" fill className="object-cover" />
          ) : (
            <User size={48} className="text-gray-300 dark:text-slate-600" />
          )}

          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current.click()}
            className="absolute inset-0 bg-black/40 lg:opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity active:bg-black/60 active:opacity-100"
          >
            {isUploading ? <Loader2 className="animate-spin text-white" /> : <Camera className="text-white" />}
          </button>
        </div>
      </div>
      <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFile} />
      <p className="text-xs text-gray-500 dark:text-slate-400 font-medium tracking-tight">
        Tap photo to update
      </p>
    </div>
  );
}