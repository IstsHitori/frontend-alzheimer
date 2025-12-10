import { uploadImageApi } from "@/api";
import { handleErrorToast } from "@/shared/helpers/error-handler";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUploadImage() {
  const { mutate, isPending } = useMutation({
    mutationFn: (images: File[]) => uploadImageApi.uploadImage(images),
    onSuccess: () => toast.success("Imagenes subidas correctamente"),
    onError: (error) => handleErrorToast(error),
  });
  return { mutate, isPending };
}
