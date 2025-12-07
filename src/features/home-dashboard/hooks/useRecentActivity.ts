import { useQuery } from "@tanstack/react-query";
import { useActivityStore } from "../store/activity.store";
import { activityApi } from "@/api";

export function useRecentActivity() {
  const activities = useActivityStore((state) => state.activities);
  const setActivities = useActivityStore((state) => state.setActivities);

  const activitiesQuery = useQuery({
    queryKey: ["activities"],
    queryFn: activityApi.getActivities,
    staleTime: 1000 * 60 * 3,
  });
  return { activities, activitiesQuery, setActivities };
}
