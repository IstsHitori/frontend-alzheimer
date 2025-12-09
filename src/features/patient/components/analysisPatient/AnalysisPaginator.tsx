import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { data } from "react-router-dom";

type AnalysisPaginatorProps = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
};
export function AnalysisPaginator({
  totalPages,
  currentPage,
  handlePageChange,
}: AnalysisPaginatorProps) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-700">
          Página <span className="font-semibold">{currentPage}</span> de{" "}
          <span className="font-semibold">{totalPages}</span>
        </p>
        <span className="text-sm text-gray-500">
          ({data?.length || 0} análisis en total)
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
              className={`w-10 ${
                currentPage === page
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-gray-700"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
