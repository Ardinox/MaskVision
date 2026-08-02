"use client";

import { LoaderCircle } from "lucide-react";

type ProcessingCardProps = {
  fileName: string;
};

export default function ProcessingCard({
  fileName,
}: ProcessingCardProps) {
  return (
    <div className="mx-auto mt-2 w-full max-w-2xl rounded-2xl border bg-white dark:bg-zinc-900 p-8 shadow-lg">

      <div className="flex flex-col items-center text-center">

        <LoaderCircle className="h-14 w-14 animate-spin text-blue-600 dark:text-blue-400" />

        <h2 className="mt-6 text-2xl font-bold">
          Processing Your File
        </h2>

        <div className="mt-4 max-w-md rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
          Please wait while your file is being processed. Do not refresh or close this page.
        </div>

        <div className="mt-8 w-full rounded-xl border bg-zinc-50 dark:bg-zinc-800 p-4 text-left">
          <p className="font-medium">
            File
          </p>

          <p className="break-all text-sm text-zinc-500 dark:text-zinc-400  mt-1">
            {fileName}
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center justify-center gap-2">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            <span>Analyzing and masking sensitive information...</span>
          </div>

          <p className="mt-2">
            Large videos may take a few minutes to process.
          </p>
        </div>

      </div>

    </div>
  );
}