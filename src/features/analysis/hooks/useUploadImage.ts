import { uploadImageApi } from "@/api";
import { handleErrorToast } from "@/shared/helpers/error-handler";
import { useMutation } from "@tanstack/react-query";

export default function useUploadImage() {
  const { mutate } = useMutation({
    mutationFn: (images: FileList[]) => uploadImageApi.uploadImage(images),
    onSuccess: (data) => {},
    onError: (error) => handleErrorToast(error),
  });
  return { mutate };
}
