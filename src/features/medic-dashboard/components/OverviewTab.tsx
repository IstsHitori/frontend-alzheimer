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
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Análisis"
          value={resumeStats.totalAnalysis || 0}
          icon={Brain}
          iconClassName="text-primary"
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
          iconClassName="text-primary"
        />
      </div>

      {/* Distribution Chart */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <div className="p-2 bg-primary/10 rounded-md">
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            Distribución de Diagnósticos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-4">
            {/* Sanos */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Sanos</span>
                <span className="text-sm font-bold text-gray-900">
                  {resumeStats.distributionDiagnostic?.healthy || 0}
                </span>
              </div>
              <Progress value={healthyPercentage} className="h-2 bg-gray-200" />
              <span className="text-xs text-gray-600">{healthyPercentage.toFixed(1)}%</span>
            </div>

            {/* Alzheimer Leve */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Alzheimer Leve</span>
                <span className="text-sm font-bold text-gray-900">
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
                className="h-2 bg-gray-200"
              />
              <span className="text-xs text-gray-600">
                {resumeStats.totalAnalysis > 0
                  ? (((resumeStats.distributionDiagnostic?.lowAlzheimer || 0) /
                      resumeStats.totalAnalysis) *
                    100).toFixed(1)
                  : 0}
                %
              </span>
            </div>

            {/* Alzheimer Moderado */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Alzheimer Moderado</span>
                <span className="text-sm font-bold text-gray-900">
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
                className="h-2 bg-gray-200"
              />
              <span className="text-xs text-gray-600">
                {resumeStats.totalAnalysis > 0
                  ? (((resumeStats.distributionDiagnostic?.moderateAlzheimer || 0) /
                      resumeStats.totalAnalysis) *
                    100).toFixed(1)
                  : 0}
                %
              </span>
            </div>

            {/* Alzheimer Severo */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Alzheimer Severo</span>
                <span className="text-sm font-bold text-gray-900">
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
                className="h-2 bg-gray-200"
              />
              <span className="text-xs text-gray-600">
                {resumeStats.totalAnalysis > 0
                  ? (((resumeStats.distributionDiagnostic?.severeAlzheimer || 0) /
                      resumeStats.totalAnalysis) *
                    100).toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
