import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { PatientAnalysis } from "@/features/analysis/types";
import { Brain, Badge, Download, Trash2 } from "lucide-react";
import type { Dispatch } from "react";
import { formatDate } from "../../helpers";
import { ImageAnalysisPatient } from ".";

type SelectedImageProps = {
  url: string;
  fileName: string;
};

type AnalysisCardPatientProps = {
  analysis: PatientAnalysis;
  setSelectedImage: Dispatch<SelectedImageProps>;
};

export function AnalysisCardPatient({
  analysis,
  setSelectedImage,
}: AnalysisCardPatientProps) {
  return (
    <Card className="border border-gray-200 shadow-sm overflow-hidden bg-white">
      {/* Header compacto */}
      <CardHeader className="pb-3 pt-4 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base text-gray-900">
                Análisis #{analysis.id}
              </CardTitle>
              <p className="text-xs text-gray-500 mt-0.5">
                {formatDate(analysis.createdAt)} • {analysis.user.name}
              </p>
            </div>
          </div>
          <Badge className="bg-blue-500 text-white border-0 text-xs">
            {analysis.user.role}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-6">
        {/* Imágenes analizadas */}
        {analysis.imageAnalysis.length > 0 ? (
          <div className="space-y-6">
            {analysis.imageAnalysis.map((imgAnalysis) => (
              <ImageAnalysisPatient
                key={imgAnalysis.id}
                imgAnalysis={imgAnalysis}
                setSelectedImage={setSelectedImage}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm py-4">
            No hay imágenes analizadas
          </p>
        )}
      </CardContent>

      {/* Footer minimalista */}
      <div className="border-t border-gray-100 bg-gray-50 px-4 sm:px-6 py-3 flex justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          className="text-gray-600 border-gray-300 text-xs h-8"
        >
          <Download className="h-3.5 w-3.5 mr-1" />
          Descargar
        </Button>
        <Button
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white text-xs h-8"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Eliminar
        </Button>
      </div>
    </Card>
  );
}
