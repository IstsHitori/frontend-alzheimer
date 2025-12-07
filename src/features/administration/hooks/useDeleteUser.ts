import { userApi } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { User } from "../types/user.types";
import { handleErrorToast } from "@/shared/helpers/error-handler";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: (userId: User["id"]) => userApi.deleteUser(userId),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      handleErrorToast(error);
    },
  });
  return { deleteUserMutation };
};
