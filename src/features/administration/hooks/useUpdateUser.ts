import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { UpdateUser } from "../types/user.types";
import { userApi } from "@/api";
import { handleErrorToast } from "@/shared/helpers/error-handler";

type UseUpdateUserMutationType = {
  user: UpdateUser;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: ({ user }: UseUpdateUserMutationType) =>
      userApi.updateUser(user),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      handleErrorToast(error);
    },
  });
  return { updateUserMutation };
};
