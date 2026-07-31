"use client";

import { Button } from "@/components/ui/button";

type PreviewCardProps = {
    file: File | null;
    onProcess: () => void;
    onRemove: () => void;
};

export default function PreviewCard({
    file,
    onProcess,
    onRemove,
}: PreviewCardProps) {
    if (!file) return null;

    const previewUrl = URL.createObjectURL(file);

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    return (
        <div className="mx-auto mt-2 w-full max-w-2xl rounded-2xl border bg-white p-8 shadow-lg dark:bg-zinc-900">
            <h2 className="text-center text-2xl font-bold">Preview</h2>

            <div className="mt-6 flex justify-center">
                {isImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-87.5 w-auto rounded-xl border object-contain"
                    />
                )}

                {isVideo && (
                    <video
                        src={previewUrl}
                        controls
                        playsInline
                        className="max-h-87.5 w-full rounded-xl border"
                    />
                )}
            </div>

            <div className="mt-6 space-y-2 text-sm">
                <p>
                    <span className="font-semibold">Name:</span> {file.name}
                </p>

                <p>
                    <span className="font-semibold">Type:</span> {file.type}
                </p>

                <p>
                    <span className="font-semibold">Size:</span>{" "}
                    <span className="font-semibold">Size:</span> {formatFileSize(file.size)}
                </p>
            </div>

            <div className="mt-8 flex justify-center gap-4">
                <Button
                    onClick={onProcess}
                    className="px-6 py-6 text-md bg-green-500 transition-transform duration-200 hover:scale-105 hover:bg-green-600"
                >
                    Start Masking
                </Button>

                <Button className='px-4 py-6 transition-transform duration-200 hover:scale-105' variant="outline" onClick={onRemove}>
                    Choose Another File
                </Button>
            </div>
        </div>
    );
}