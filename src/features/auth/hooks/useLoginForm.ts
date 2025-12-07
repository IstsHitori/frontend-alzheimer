import { authApi } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginPayload } from "../types/auth.types";
import { loginPayloadSchema } from "../schemas/auth.schema";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const navigate = useNavigate();

  const defaultValues: LoginPayload = {
    userName: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(loginPayloadSchema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: authApi.login,
    onError: (error) => {
      toast.error(error.message, {
        action: {
          label: "Cerrar",
          onClick: () => console.log(),
        },
      });
    },
    onSuccess: (data) => {
      localStorage.setItem("authToken", data);
      navigate("/app/home");
    },
  });
  return { register, handleSubmit, mutate, isPending, errors };
};
