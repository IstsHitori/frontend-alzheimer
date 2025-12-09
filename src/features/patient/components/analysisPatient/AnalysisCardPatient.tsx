import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { PatientAnalysis } from "@/features/analysis/types";
import { Brain, Badge, Eye, Download, Trash2 } from "lucide-react";
import type { Dispatch } from "react";

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
    <Card
      key={analysis.id}
      className="border border-gray-200 shadow-sm overflow-hidden bg-white"
    >
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
                {new Date(analysis.createdAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                • {analysis.user.name}
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
            {analysis.imageAnalysis.map((imgAnalysis) => {
              // Preparar datos de probabilidades ordenados de más grave a más sano
              const probabilities = [
                {
                  label: "Moderada",
                  value: imgAnalysis.moderateDemented,
                  severity: 3,
                  color: "text-red-700",
                  bgColor: "bg-red-50",
                  borderColor: "border-red-200",
                },
                {
                  label: "Leve",
                  value: imgAnalysis.mildDemented,
                  severity: 2,
                  color: "text-amber-700",
                  bgColor: "bg-amber-50",
                  borderColor: "border-amber-200",
                },
                {
                  label: "Muy Leve",
                  value: imgAnalysis.veryMildDemented,
                  severity: 1,
                  color: "text-blue-700",
                  bgColor: "bg-blue-50",
                  borderColor: "border-blue-200",
                },
                {
                  label: "Sin Demencia",
                  value: imgAnalysis.nonDemented,
                  severity: 0,
                  color: "text-green-700",
                  bgColor: "bg-green-50",
                  borderColor: "border-green-200",
                },
              ]; // Orden fijo: Moderada → Leve → Muy Leve → Sin Demencia

              const primaryDiagnosis = probabilities[0];
              const diagnosisDate = new Date(
                imgAnalysis.image.createdAt
              ).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={imgAnalysis.id}
                  className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
                >
                  <div className="grid lg:grid-cols-[180px_1fr] gap-6 p-5">
                    {/* COLUMNA IZQUIERDA: Imagen prominente */}
                    <div className="flex flex-col gap-3">
                      <div
                        className="w-full aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:ring-4 hover:ring-blue-200 transition-all group relative"
                        onClick={() =>
                          setSelectedImage({
                            url: imgAnalysis.image.imageUrl,
                            fileName: imgAnalysis.image.fileName,
                          })
                        }
                      >
                        <img
                          src={imgAnalysis.image.imageUrl}
                          alt={imgAnalysis.image.fileName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 font-medium">
                          Estudio del
                        </p>
                        <p className="text-sm text-gray-700 font-semibold">
                          {diagnosisDate}
                        </p>
                      </div>
                    </div>

                    {/* COLUMNA DERECHA: Datos clínicos */}
                    <div className="space-y-4">
                      {/* Header con diagnóstico principal */}
                      <div
                        className={`${primaryDiagnosis.bgColor} ${primaryDiagnosis.borderColor} border-l-4 rounded-lg p-4`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-xs text-gray-600 font-medium mb-1">
                              DIAGNÓSTICO PRINCIPAL
                            </p>
                            <h3
                              className={`text-2xl font-bold ${primaryDiagnosis.color} mb-2`}
                            >
                              {imgAnalysis.diagnosis}
                            </h3>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Archivo:</span>{" "}
                              {imgAnalysis.image.fileName}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <div
                              className={`inline-flex items-baseline gap-1 ${primaryDiagnosis.color}`}
                            >
                              <span className="text-4xl font-bold">
                                {(primaryDiagnosis.value * 100).toFixed(0)}
                              </span>
                              <span className="text-xl font-semibold">%</span>
                            </div>
                            <p className="text-xs text-gray-600 font-medium mt-1">
                              Confianza
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tabla de probabilidades */}
                      <div>
                        <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                          Distribución de Probabilidades
                        </p>
                        <div className="space-y-2">
                          {probabilities.map((prob, idx) => (
                            <div
                              key={prob.label}
                              className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                                idx === 0
                                  ? `${prob.bgColor} ${prob.borderColor} border-2`
                                  : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className="flex-1 flex items-center gap-3">
                                <span
                                  className={`text-sm font-semibold ${
                                    idx === 0 ? prob.color : "text-gray-700"
                                  } w-28`}
                                >
                                  {prob.label}
                                </span>
                                <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-500 ${
                                      prob.severity === 0
                                        ? "bg-green-600"
                                        : prob.severity === 1
                                        ? "bg-blue-600"
                                        : prob.severity === 2
                                        ? "bg-amber-600"
                                        : "bg-red-600"
                                    }`}
                                    style={{
                                      width: `${prob.value * 100}%`,
                                    }}
                                  />
                                </div>
                              </div>
                              <span
                                className={`text-base font-bold ${
                                  idx === 0 ? prob.color : "text-gray-700"
                                } w-14 text-right`}
                              >
                                {(prob.value * 100).toFixed(1)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-700 border-blue-300 hover:bg-blue-50"
                          onClick={() =>
                            setSelectedImage({
                              url: imgAnalysis.image.imageUrl,
                              fileName: imgAnalysis.image.fileName,
                            })
                          }
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Imagen Completa
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-gray-700 border-gray-300 hover:bg-gray-50"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Exportar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
