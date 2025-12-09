import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface DashboardHeaderProps {
  onBack?: () => void;
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ onBack, title, subtitle }: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {onBack && (
            <Button variant="outline" onClick={onBack} size="sm" className="border-gray-200 hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-xs md:text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
