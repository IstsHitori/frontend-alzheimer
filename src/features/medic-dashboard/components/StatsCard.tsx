import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconClassName?: string;
  valueClassName?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = "text-primary",
  valueClassName,
}: StatsCardProps) {
  return (
    <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-md">
          <Icon className={`h-4 w-4 ${iconClassName}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold text-gray-900 ${valueClassName || ""}`}>{value}</div>
        {description && (
          <p className="text-xs text-gray-600 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
