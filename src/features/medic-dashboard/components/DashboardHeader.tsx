import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface DashboardHeaderProps {
  onBack?: () => void;
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ onBack, title, subtitle }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
      {onBack && (
        <Button variant="outline" onClick={onBack} size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      )}
      <div>
        <h1 className="text-lg md:text-xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-xs md:text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
