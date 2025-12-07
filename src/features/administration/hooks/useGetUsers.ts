import { userApi } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers() {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: userApi.getAllUsers,
    staleTime: 1000 * 60 * 5
  });
  return { usersQuery };
}
