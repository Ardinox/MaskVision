import axios from "axios";
import { toast } from "sonner";

export function handleApiError(err: unknown) {
    if (axios.isAxiosError(err)) {
        if (!err.response) {
            toast.error("Backend server is offline.");
        } else {
            switch (err.response.status) {
                case 400:
                    toast.error(err.response.data?.detail ?? "Invalid request.");
                    break;

                case 401:
                    toast.error("Unauthorized request.");
                    break;

                case 403:
                    toast.error("Access denied.");
                    break;

                case 404:
                    toast.error("Requested resource was not found.");
                    break;

                case 413:
                    toast.error("File is too large.");
                    break;

                default:
                    if (err.response.status >= 500) {
                        toast.error("Server encountered an error. Please try again.");
                    } else {
                        toast.error("Something went wrong.");
                    }
            }
        }
    } else {
        toast.error("Unexpected error occurred.");
    }
}