import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateUser } from "../types/user.types";
import { userApi } from "@/api";
import { handleErrorToast } from "@/shared/helpers/error-handler";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (newUser: CreateUser) => userApi.createUser(newUser),

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
  return { createUserMutation };
};
