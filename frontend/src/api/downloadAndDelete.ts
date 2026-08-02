import api from "./axios";

export async function downloadFile(downloadUrl: string) {
    window.open(
        `${api.defaults.baseURL}/download/${downloadUrl}`,
        "_blank"
    );
}

export async function deleteFile(filename: string) {
    await api.delete(`/delete/${filename}`);
}

export function cleanupFile(filename: string) {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/${filename}`, {
    method: "DELETE",
    keepalive: true,
  }).catch(() => {});
}