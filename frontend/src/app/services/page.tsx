"use client";

import { useState, useEffect, useRef } from "react";

import { toast } from "sonner"

import UploadCard from "@/components/UploadCard";
import PreviewCard from "@/components/PreviewCard";
import ProcessingCard from "@/components/ProcessingCard";
import ResultCard from "@/components/ResultCard";
import { UploadMedia } from "@/api/upload";
import { MaskResponse } from "@/types/api";
import { cleanupFile, deleteFile, downloadFile } from "@/api/downloadAndDelete";
import { handleApiError } from "@/lib/handleApiError";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<MaskResponse | null>(null);

  const deletedRef = useRef(false);

  useEffect(() => {
    deletedRef.current = false;

    return () => {
      if (!result || deletedRef.current) return;

      cleanupFile(result.filename);
    };
  }, [result]);

  const handleProcess = async () => {
    if (!file) return;

    setProcessing(true);

    try {
      const response = await UploadMedia(file);
      setResult(response);
    } catch (err) {
      handleApiError(err)
    }
    finally {
      setProcessing(false);
    }
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
      ) : result ? (
        <ResultCard
          fileName={result.filename}
          fileType={file.type}
          fileSize={file.size}
          onDownload={async () => {
            try {
              await downloadFile(result.download_url);
              toast.success("Download started.")
            } catch (err) {
              handleApiError(err)
            }

          }}
          onReset={async () => {
            try {
              await deleteFile(result.filename);
              deletedRef.current = true;
              toast.success("File removed from server.");
            } catch (err) {
              handleApiError(err)
            } finally {
              setResult(null);
              setFile(null);
            }
          }}
        />
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
