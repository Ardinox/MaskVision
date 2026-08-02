"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";

type UploadCardProps = {
  title: string;
  description: string;
  accept: string;
  onFileSelect: (file: File) => void;
};

export default function UploadCard({
  title,
  description,
  accept,
  onFileSelect,
}: UploadCardProps) {
  const [dragging, setDragging] = useState(false);
  const [, setSelectedFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Validate dropped/selected file type
    const valid = accept.split(",").some((type) => {
      const prefix = type.trim().replace("/*", "/");
      return file.type.startsWith(prefix);
    });

    if (!valid) {
      alert("Unsupported file type.");
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (!file) return;

    handleFile(file);
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border bg-white p-8 shadow-lg dark:bg-zinc-900">
      <div className="flex flex-col items-center text-center">
        <Upload className="mb-5 h-12 w-12 text-blue-600 dark:text-blue-400" />

        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>

        <label
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mt-8 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
            dragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
              : "border-zinc-300 hover:border-blue-500 hover:bg-blue-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          }`}
        >
          <Upload className="mb-3 h-8 w-8 text-blue-600 dark:text-blue-400" />

          <p className="font-semibold">
            {dragging ? "Drop your file here" : "Drag & Drop your file here"}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            or click anywhere to browse
          </p>

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>

        <p className="mt-6 text-sm text-zinc-500">
          Supported formats: {accept}
        </p>
      </div>
    </div>
  );
}