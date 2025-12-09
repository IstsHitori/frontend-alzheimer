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
    <Card className="border border-gray-200 bg-white rounded-lg hover:shadow-lg transition-all duration-300 animate-slide-up-delay-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Activity_icon className="h-5 w-5 text-primary" />
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
