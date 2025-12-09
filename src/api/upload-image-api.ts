import type { CloudinaryImage } from "@/features/analysis/types";
import { api } from "./base-http";
import { fetchAndValidateSchema, handleAxiosError } from "@/shared/helpers";
import { arrayCloudinaryImageResponseSchema } from "@/features/analysis/schemas";

class UploadImageApi {
  async uploadImage(images: FileList[]): Promise<CloudinaryImage[]> {
    try {
      return await fetchAndValidateSchema<CloudinaryImage[]>(
        () => api.post("/cloudinary", images),
        arrayCloudinaryImageResponseSchema
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

export const uploadImageApi = new UploadImageApi();
