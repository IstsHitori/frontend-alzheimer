import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Dispatch } from "react";

type SelectedImageProps = {
  url: string;
  fileName: string;
};

type ModalImageProps = {
  selectedImage: SelectedImageProps;
  setSelectedImage: Dispatch<SelectedImageProps | null>;
};

export function ModalImage({
  selectedImage,
  setSelectedImage,
}: ModalImageProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header mínimo */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">
            {selectedImage.fileName}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedImage(null)}
            className="text-gray-500 hover:text-gray-900 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Imagen */}
        <div className="bg-gray-100 max-h-[70vh] overflow-auto flex items-center justify-center">
          <img
            src={selectedImage.url}
            alt={selectedImage.fileName}
            className="max-w-full max-h-full"
          />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedImage(null)}
            className="text-gray-600 border-gray-300 text-xs h-8"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
