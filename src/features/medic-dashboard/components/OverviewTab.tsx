import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Users,
  CheckCircle,
  AlertTriangle,
  PieChart,
} from "lucide-react";
import { StatsCard } from "./StatsCard";
import type { MedicDashboard } from "../types";

interface OverviewTabProps {
  stats: MedicDashboard;
}

export function OverviewTab({ stats }: OverviewTabProps) {
  // Guard clause for undefined or null stats
  if (!stats || !stats.resumeStats) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Cargando estadísticas...</p>
      </div>
    );
  }

  const { resumeStats } = stats;
  const totalAlzheimer = resumeStats.alzheimerCases?.cases || 0;
  const healthyPercentage = resumeStats.healthyCases?.percentaje || 0;
  const alzheimerPercentage = resumeStats.alzheimerCases?.percentaje || 0;

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Análisis"
          value={resumeStats.totalAnalysis || 0}
          icon={Brain}
        />
        <StatsCard
          title="Casos Sanos"
          value={resumeStats.healthyCases?.cases || 0}
          description={`${healthyPercentage.toFixed(1)}% del total`}
          icon={CheckCircle}
          iconClassName="text-green-600"
          valueClassName="text-green-600"
        />
        <StatsCard
          title="Casos Alzheimer"
          value={totalAlzheimer}
          description={`${alzheimerPercentage.toFixed(1)}% del total`}
          icon={AlertTriangle}
          iconClassName="text-red-600"
          valueClassName="text-red-600"
        />
        <StatsCard
          title="Edad Promedio"
          value={`${Math.round(resumeStats.averageAge || 0)} años`}
          icon={Users}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-1">
        {/* Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Distribución de Diagnósticos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Sanos</span>
                <span className="text-sm font-medium">
                  {resumeStats.distributionDiagnostic?.healthy || 0}
                </span>
              </div>
              <Progress value={healthyPercentage} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Alzheimer Leve</span>
                <span className="text-sm font-medium">
                  {resumeStats.distributionDiagnostic?.lowAlzheimer || 0}
                </span>
              </div>
              <Progress
                value={
                  resumeStats.totalAnalysis > 0
                    ? ((resumeStats.distributionDiagnostic?.lowAlzheimer || 0) /
                        resumeStats.totalAnalysis) *
                      100
                    : 0
                }
                className="h-2"
              />

              <div className="flex items-center justify-between">
                <span className="text-sm">Alzheimer Moderado</span>
                <span className="text-sm font-medium">
                  {resumeStats.distributionDiagnostic?.moderateAlzheimer || 0}
                </span>
              </div>
              <Progress
                value={
                  resumeStats.totalAnalysis > 0
                    ? ((resumeStats.distributionDiagnostic?.moderateAlzheimer ||
                        0) /
                        resumeStats.totalAnalysis) *
                      100
                    : 0
                }
                className="h-2"
              />

              <div className="flex items-center justify-between">
                <span className="text-sm">Alzheimer Severo</span>
                <span className="text-sm font-medium">
                  {resumeStats.distributionDiagnostic?.severeAlzheimer || 0}
                </span>
              </div>
              <Progress
                value={
                  resumeStats.totalAnalysis > 0
                    ? ((resumeStats.distributionDiagnostic?.severeAlzheimer ||
                        0) /
                        resumeStats.totalAnalysis) *
                      100
                    : 0
                }
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
