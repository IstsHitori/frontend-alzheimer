import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityItem, ActivitySkeleton } from ".";
import { Activity as Activity_icon } from "lucide-react";
import type { Activity } from "../types";

interface RecentActivityProps {
  isLoading: boolean;
  activities: Activity[];
}

export function RecentActivity({ isLoading, activities }: RecentActivityProps) {
  return (
    <Card className="medical-card animate-slide-up-delay-4 hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 animate-slide-right">
          <Activity_icon className="h-5 w-5 text-primary animate-pulse" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(activities.length)].map((_, index) => (
              <ActivitySkeleton key={index} />
            ))}
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8 animate-fade-in">
            No hay actividades recientes
          </p>
        )}
      </CardContent>
    </Card>
  );
}
