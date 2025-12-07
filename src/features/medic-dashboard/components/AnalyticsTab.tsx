import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { MedicDashboard } from "../types";

interface AnalyticsTabProps {
  stats: MedicDashboard | null;
}

export function AnalyticsTab({ stats }: AnalyticsTabProps) {
  // Guard clause for undefined or null stats
  if (!stats || !stats.analysisStats || !stats.resumeStats) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Cargando análisis...</p>
      </div>
    );
  }

  const { analysisStats, resumeStats } = stats;
  const totalAnalysis = resumeStats.totalAnalysis || 1; // Avoid division by zero

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:gap-6">
        {/* Gender Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Análisis por Género</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Masculino</span>
              <span className="text-sm font-medium">
                {analysisStats.analysisByGender?.male || 0}
              </span>
            </div>
            <Progress
              value={
                ((analysisStats.analysisByGender?.male || 0) / totalAnalysis) *
                100
              }
              className="h-2"
            />

            <div className="flex items-center justify-between">
              <span className="text-sm">Femenino</span>
              <span className="text-sm font-medium">
                {analysisStats.analysisByGender?.female || 0}
              </span>
            </div>
            <Progress
              value={
                ((analysisStats.analysisByGender?.female || 0) /
                  totalAnalysis) *
                100
              }
              className="h-2"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
