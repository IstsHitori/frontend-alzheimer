import useGetAnalysisByPatientId from "@/features/analysis/hooks/useGetAnalysisByPatientId";
import type { Patient } from "../../types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Brain } from "lucide-react";
import { useState, useMemo } from "react";
import {
  AnalysisCardPatient,
  AnalysisPaginator,
  ModalImage,
} from "../analysisPatient";

type PatientAnalysisProps = {
  patientId: Patient["id"];
};

export function PatientAnalysisInfo({ patientId }: PatientAnalysisProps) {
  const { isFetching, isError, data, error } = useGetAnalysisByPatientId({
    patientId,
  });
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    fileName: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calcular paginación
  const totalPages = useMemo(() => {
    return data ? Math.ceil(data.length / itemsPerPage) : 0;
  }, [data]);

  const paginatedData = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage]);

  // Reset página cuando cambia el paciente
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isFetching) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-red-800">
            Error al cargar análisis
          </h3>
          <p className="text-sm text-red-700 mt-1">
            {error?.message ||
              "No se pudieron obtener los análisis del paciente"}
          </p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <Brain className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 font-medium">No hay análisis disponibles</p>
        <p className="text-sm text-gray-500 mt-1">
          Aún no se han realizado análisis para este paciente
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {paginatedData.map((analysis) => (
        <AnalysisCardPatient
          key={analysis.id}
          setSelectedImage={setSelectedImage}
          analysis={analysis}
        />
      ))}

      {/* Paginador */}
      {totalPages > 1 && (
        <AnalysisPaginator
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}

      {/* Modal minimalista */}
      {selectedImage && (
        <ModalImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
    </div>
  );
}
