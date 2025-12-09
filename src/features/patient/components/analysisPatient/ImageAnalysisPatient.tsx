import type { PatientImageAnalysis } from "@/features/analysis/types";
import { formatDate } from "../../helpers";
import type { Dispatch } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ProbabilyItem } from ".";
import { useGetProbability } from "../../hooks/useGetProbaility";

type SelectedImageProps = {
  url: string;
  fileName: string;
};

type ImageAnalysisPatientProps = {
  imgAnalysis: PatientImageAnalysis;
  setSelectedImage: Dispatch<SelectedImageProps>;
};

export function ImageAnalysisPatient({
  imgAnalysis,
  setSelectedImage,
}: ImageAnalysisPatientProps) {
  const { probabilities, primaryDiagnosis } = useGetProbability(
    imgAnalysis,
    imgAnalysis.diagnosis
  );

  const diagnosisDate = formatDate(imgAnalysis.image.createdAt, "2-digit");
  console.log(imgAnalysis.diagnosis, primaryDiagnosis);

  return (
    <>
      <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
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
              <p className="text-xs text-gray-500 font-medium">Estudio del</p>
              <p className="text-sm text-gray-700 font-semibold">
                {diagnosisDate}
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA: Datos clínicos */}
          <div className="space-y-4">
            {/* Header con diagnóstico principal */}
            <div
              className={` ${primaryDiagnosis.borderColor} border-l-4 rounded-lg p-4`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    DIAGNÓSTICO PRINCIPAL
                  </p>
                  <h3
                    className={`text-2xl font-semibold ${primaryDiagnosis.color} mb-2`}
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
                      {primaryDiagnosis.value}
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
                  <ProbabilyItem key={idx} prob={prob} />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
