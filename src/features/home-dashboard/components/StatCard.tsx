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
      className={`medical-card hover:scale-105 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slide-up${animationDelay} group`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-sm text-muted-foreground mb-1 group-hover:${textColor} transition-colors`}
            >
              {title}
            </p>
            <p
              className={`text-3xl font-bold ${textColor} animate-number-count`}
            >
              {value}
            </p>
            <p
              className={`text-xs ${subtitleColor} flex items-center gap-1 mt-1 animate-slide-up-delay`}
            >
              <TrendingUp className="h-3 w-3 animate-bounce-subtle" />
              {subtitle}
            </p>
          </div>
          <div
            className={`p-3 ${bgColor} rounded-xl group-hover:${bgColor}/20 group-hover:rotate-12 transition-all duration-300`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
