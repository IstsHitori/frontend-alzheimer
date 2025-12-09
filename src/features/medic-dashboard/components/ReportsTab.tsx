import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BarChart3 } from "lucide-react";

interface ReportsTabProps {
  onGenerateMonthly: () => void;
  onGenerateComparative: () => void;
  isGeneratingMonthly: boolean;
  isGeneratingComparative: boolean;
}

export function ReportsTab({
  onGenerateMonthly,
  onGenerateComparative,
  isGeneratingMonthly,
  isGeneratingComparative,
}: ReportsTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Monthly Report */}
        <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-900">
              <div className="p-3 bg-blue-50 rounded-md">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              Reporte Mensual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              Estadísticas completas del mes actual con tendencias y métricas de
              rendimiento detalladas
            </p>
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={onGenerateMonthly}
              disabled={isGeneratingMonthly}
            >
              <FileText className="h-4 w-4 mr-2" />
              {isGeneratingMonthly ? "Generando..." : "Generar Reporte"}
            </Button>
          </CardContent>
        </Card>

        {/* Comparative Analysis */}
        <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-900">
              <div className="p-3 bg-primary/10 rounded-md">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              Análisis Comparativo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              Comparación detallada entre casos sanos y con Alzheimer, incluyendo
              patrones demográficos y análisis longitudinal
            </p>
            <Button
              className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
              onClick={onGenerateComparative}
              disabled={isGeneratingComparative}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              {isGeneratingComparative ? "Generando..." : "Ver Comparación"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
