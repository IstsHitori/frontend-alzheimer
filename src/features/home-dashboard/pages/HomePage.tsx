import { useEffect } from "react";
import { RecentActivity, StatsGrid, WelcomeHeader } from "../components";
import { useAuth } from "@/features/auth/hooks";
import { useHomeStats, useRecentActivity } from "../hooks";

export default function HomePage() {
  const { profile } = useAuth();
  const { homeStats, homeQuery, setHomeStats } = useHomeStats();
  const { activities, activitiesQuery, setActivities } = useRecentActivity();

  useEffect(() => {
    if (activitiesQuery.isSuccess && activitiesQuery.data) {
      setActivities(activitiesQuery.data);
    }
  }, [activitiesQuery.isSuccess, activitiesQuery.data, setActivities]);

  useEffect(() => {
    if (homeQuery.isSuccess && homeQuery.data) {
      setHomeStats(homeQuery.data);
    }
  }, [homeQuery.isSuccess, homeQuery.data, setHomeStats]);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <WelcomeHeader doctorName={profile.name} />

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsGrid isLoading={homeQuery.isFetching} stats={homeStats} />
      </div>

      <RecentActivity
        isLoading={activitiesQuery.isFetching}
        activities={activities}
      />
    </div>
  );
}
