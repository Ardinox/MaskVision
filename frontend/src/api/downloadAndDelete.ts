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