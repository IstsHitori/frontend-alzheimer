import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  subtitleColor: string;
  animationDelay?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  bgColor,
  textColor,
  subtitleColor,
  animationDelay = "",
}: StatCardProps) {
  return (
    <Card
      className={`hover:scale-105 hover:shadow-lg transition-all duration-300 animate-slide-up${animationDelay} group border border-gray-200 bg-white rounded-lg`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p
              className={`text-sm text-gray-500 mb-2 group-hover:text-primary transition-colors font-medium`}
            >
              {title}
            </p>
            <p className={`text-4xl font-bold ${textColor}`}>{value}</p>
            <p
              className={`text-xs ${subtitleColor} flex items-center gap-1 mt-2`}
            >
              <TrendingUp className="h-3 w-3" />
              {subtitle}
            </p>
          </div>
          <div className={`p-3 ${bgColor} rounded-lg ml-4 shrink-0`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
