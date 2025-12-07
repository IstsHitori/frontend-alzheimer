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
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reporte Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Estadísticas completas del mes actual con tendencias y métricas de
              rendimiento
            </p>
            <Button
              className="w-full"
              onClick={onGenerateMonthly}
              disabled={isGeneratingMonthly}
            >
              <FileText className="h-4 w-4 mr-2" />
              {isGeneratingMonthly ? "Generando..." : "Generar Reporte"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Análisis Comparativo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Comparación detallada entre casos sanos y con Alzheimer, incluyendo
              patrones demográficos
            </p>
            <Button
              variant="outline"
              className="w-full bg-transparent"
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
