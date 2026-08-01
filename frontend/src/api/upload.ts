import api from "./axios";
import { MaskResponse } from "@/types/api";

export async function UploadMedia(file: File): Promise<MaskResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const endpoint = file.type.startsWith("image/")
        ? "/mask/photo"
        : "/mask/video";

    const response = await api.post<MaskResponse>(endpoint, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data
}
