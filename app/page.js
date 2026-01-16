"use client";

import { redirect } from "next/navigation";
import { CldImage } from "next-cloudinary";

export default function Home() {
  redirect("/login");

  return (
    <div>
      <CldImage
        src="cld-sample-5" // Use this sample image or upload your own via the Media Library
        width="500" // Transform the image: auto-crop to square aspect_ratio
        height="500"
        crop={{
          type: "auto",
          source: true,
        }}
      />
      page
    </div>
  );
}
