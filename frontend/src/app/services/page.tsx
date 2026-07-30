"use client";

import { useState } from "react";
import UploadCard from "@/components/UploadCard";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 pb-20">
      <UploadCard
        title="Upload Your Media"
        description="Select an image or video to automatically detect and mask sensitive information."
        accept="image/*,video/*"
        onFileSelect={setFile}
      />
    </div>
  );
}