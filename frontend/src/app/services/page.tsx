"use client";

import { useState } from "react";

import UploadCard from "@/components/UploadCard";
import PreviewCard from "@/components/PreviewCard";
import ProcessingCard from "@/components/ProcessingCard";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleProcess = async () => {
    if (!file) return;

    setProcessing(true);

    const formData = new FormData();
    formData.append("file", file);

    // Temporary delay to test the UI
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setProcessing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 pb-20">
      {!file ? (
        <UploadCard
          title="Upload Your Media"
          description="Select an image or video to automatically detect and mask sensitive information."
          accept="image/*,video/*"
          onFileSelect={setFile}
        />
      ) : processing ? (
        <ProcessingCard fileName={file.name} />
      ) : (
        <PreviewCard
          file={file}
          onProcess={handleProcess}
          onRemove={() => setFile(null)}
        />
      )}
    </div>
  );
}