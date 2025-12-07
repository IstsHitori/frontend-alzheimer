import { homeApi } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useHomeStatsStore } from "../store/home-stats.store";

export function useHomeStats() {
  const homeStats = useHomeStatsStore((state) => state.homeStats);
  const setHomeStats = useHomeStatsStore((state) => state.setHomeStats);

  const homeQuery = useQuery({
    queryKey: ["home-stats"],
    queryFn: homeApi.getHomeStats,
    staleTime: 1000 * 60 * 8,
  });

  return {
    setHomeStats,
    homeStats,
    homeQuery,
  };
}
