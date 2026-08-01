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

        <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-md">
          Please wait, Do not leave this page or Refresh while Processing.
        </p>

        <div className="mt-8 w-full rounded-xl border bg-zinc-50 dark:bg-zinc-800 p-4 text-left">
          <p className="font-medium">
            File
          </p>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 break-all">
            {fileName}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Processing...
        </div>

      </div>

    </div>
  );
}