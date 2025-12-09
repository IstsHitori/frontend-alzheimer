import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3 } from "lucide-react";
import type { MedicDashboard } from "../types";

interface AnalyticsTabProps {
  stats: MedicDashboard | null;
}

export function AnalyticsTab({ stats }: AnalyticsTabProps) {
  // Guard clause for undefined or null stats
  if (!stats || !stats.analysisStats || !stats.resumeStats) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-600">Cargando análisis...</p>
      </div>
    );
  }

  const { analysisStats, resumeStats } = stats;
  const totalAnalysis = resumeStats.totalAnalysis || 1; // Avoid division by zero
  const malePercentage = ((analysisStats.analysisByGender?.male || 0) / totalAnalysis) * 100;
  const femalePercentage = ((analysisStats.analysisByGender?.female || 0) / totalAnalysis) * 100;

  return (
    <div className="space-y-6">
      {/* Gender Analysis */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <div className="p-2 bg-primary/10 rounded-md">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            Análisis por Género
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Masculino */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Masculino</span>
              <span className="text-sm font-bold text-gray-900">
                {analysisStats.analysisByGender?.male || 0}
              </span>
            </div>
            <Progress
              value={malePercentage}
              className="h-2 bg-gray-200"
            />
            <span className="text-xs text-gray-600">{malePercentage.toFixed(1)}%</span>
          </div>

          {/* Femenino */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Femenino</span>
              <span className="text-sm font-bold text-gray-900">
                {analysisStats.analysisByGender?.female || 0}
              </span>
            </div>
            <Progress
              value={femalePercentage}
              className="h-2 bg-gray-200"
            />
            <span className="text-xs text-gray-600">{femalePercentage.toFixed(1)}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
