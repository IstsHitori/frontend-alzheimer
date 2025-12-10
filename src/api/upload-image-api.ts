import type { CloudinaryImage } from "@/features/analysis/types";
import { api } from "./base-http";
import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { arrayCloudinaryImageResponseSchema } from "@/features/analysis/schemas";

class UploadImageApi {
  async uploadImage(files: File[]): Promise<CloudinaryImage[]> {
    try {
      const formData = new FormData();
      
      // Añadir cada archivo con el campo 'image' que espera el backend
      files.forEach((file) => {
        formData.append('image', file);
      });

      return await fetchAndValidateSchema<CloudinaryImage[]>(
        () => api.post("/cloudinary", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
        arrayCloudinaryImageResponseSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const uploadImageApi = new UploadImageApi();
