"use client";

import { CircleCheckBig, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type ResultCardProps = {
    fileName: string;
    fileType: string;
    fileSize: number;
    onDownload: () => void;
    onReset: () => void;
};

export default function ResultCard({
    fileName,
    fileType,
    fileSize,
    onDownload,
    onReset,
}: ResultCardProps) {
    const formatFileSize = (bytes: number) => {
        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    return (
        <div className="mx-auto mt-2 w-full max-w-2xl rounded-2xl border bg-white dark:bg-zinc-900 p-8 shadow-lg">

            <div className="flex flex-col items-center">

                <CircleCheckBig className="h-14 w-14 text-green-500" />

                <h2 className="mt-4 text-2xl font-bold">
                    Processing Complete
                </h2>

                <div className="mt-5 w-full max-w-md rounded-lg bg-green-50 p-3 text-center text-sm text-green-700 dark:bg-green-950/30 dark:text-green-300">
                    Sensitive information has been successfully detected and masked. Your processed file is ready to download.
                </div>

                <div className="mt-8 w-full rounded-xl border bg-zinc-50 dark:bg-zinc-800 p-5">

                    <div className="space-y-2 text-sm">

                        <p>
                            <span className="font-semibold">Filename:</span>{" "}
                            {fileName}
                        </p>

                        <p>
                            <span className="font-semibold">Type:</span>{" "}
                            {fileType}
                        </p>

                        <p>
                            <span className="font-semibold">Size:</span>{" "}
                            {formatFileSize(fileSize)}
                        </p>

                    </div>

                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-4">

                    <Button
                        onClick={onDownload}
                        className="h-12 px-6 bg-blue-600 transition-transform duration-200 hover:scale-105 hover:bg-blue-700"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>

                    <Button
                        variant="outline"
                        onClick={onReset}
                        className="h-12 px-6 transition-transform duration-200 hover:scale-105"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Upload Another
                    </Button>

                </div>

            </div>

        </div>
    );
}