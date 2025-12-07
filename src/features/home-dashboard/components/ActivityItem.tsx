import { getActivityConfig, getTimeAgo } from "../helpers/home-dashboard.helpers";
import type { Activity } from "../types";

interface ActivityItemProps {
  activity: Activity;
  index: number;
}

export function ActivityItem({ activity, index }: ActivityItemProps) {
  const config = getActivityConfig(activity.type);
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-200 animate-slide-right-delay-${
        index + 1
      } hover:translate-x-2 hover:shadow-xs`}
    >
      <div className={`p-2.5 ${config.bg} rounded-lg animate-bounce-subtle`}>
        <Icon className={`h-5 w-5 ${config.color}`} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-foreground">{activity.title}</p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {activity.description}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Por: <span className="font-medium">@{activity.user.userName}</span>
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground font-medium">
          {getTimeAgo(activity.createdAt)}
        </p>
      </div>
    </div>
  );
}
