import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  User,
  Upload,
  X,
  Brain,
  Loader2,
  Image as ImageIcon,
  Filter,
} from "lucide-react";
import useGetPatients from "@/features/patient/hooks/useGetPatients";
import type { Patient } from "@/features/patient/types";
import { Skeleton } from "@/components/ui/skeleton";
import useUploadImage from "../hooks/useUploadImage";
import useAnylzeImages from "../hooks/useAnylzeImages";
import type { AnalyzePyload, ImageToAnlize } from "../types";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UploadedImagePreview = {
  file: File;
  preview: string;
  size: number;
  name: string;
};

export default function AnalysisPage() {
  const { patientsQuery } = useGetPatients();
  const { mutate: uploadImages, isPending: isUploading } = useUploadImage();
  const { mutate: analyzeImages, isPending: isAnalyzing } = useAnylzeImages();

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [uploadedImages, setUploadedImages] = useState<UploadedImagePreview[]>(
    []
  );

  // Filtrar pacientes
  const filteredPatients = useMemo(() => {
    if (!patientsQuery.data) return [];

    return patientsQuery.data.filter((patient) => {
      const matchesSearch =
        patient.personalInfo.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        patient.personalInfo.identification
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesGender =
        genderFilter === "all" || patient.personalInfo.gender === genderFilter;

      return matchesSearch && matchesGender;
    });
  }, [patientsQuery.data, searchTerm, genderFilter]);

  // Manejar selección de archivos
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    // Validar cantidad máxima
    if (uploadedImages.length + newFiles.length > 10) {
      toast.error("Máximo 10 imágenes permitidas");
      return;
    }

    // Validar cada archivo
    const validFiles: UploadedImagePreview[] = [];
    for (const file of newFiles) {
      // Validar tamaño (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} excede el tamaño máximo de 10MB`);
        continue;
      }

      // Validar formato
      const validFormats = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/dicom",
      ];
      if (!validFormats.includes(file.type) && !file.name.endsWith(".dcm")) {
        toast.error(`${file.name} no es un formato válido`);
        continue;
      }

      validFiles.push({
        file,
        preview: URL.createObjectURL(file),
        size: file.size,
        name: file.name,
      });
    }

    setUploadedImages([...uploadedImages, ...validFiles]);
    e.target.value = ""; // Reset input
  };

  // Remover imagen
  const handleRemoveImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    URL.revokeObjectURL(uploadedImages[index].preview); // Limpiar memoria
    setUploadedImages(newImages);
  };

  // Iniciar análisis
  const handleStartAnalysis = async () => {
    if (!selectedPatient) {
      toast.error("Selecciona un paciente primero");
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error("Debes subir al menos una imagen");
      return;
    }

    // Extraer los archivos File del array
    const files = uploadedImages.map((img) => img.file);

    // Subir imágenes a Cloudinary
    uploadImages(files, {
      onSuccess: (cloudinaryImages) => {
        // Extraer solo URL y fileName
        const imagesToAnalyze: ImageToAnlize[] = cloudinaryImages.map(
          (img) => ({
            fileUrl: img.secure_url,
            fileName: img.original_filename,
          })
        );

        // Obtener token
        const token = localStorage.getItem("authToken") || "";

        // Crear payload para análisis
        const payload: AnalyzePyload = {
          patientId: selectedPatient.id,
          token,
          images: imagesToAnalyze,
        };

        // Enviar a análisis ML
        analyzeImages(payload, {
          onSuccess: () => {
            // Limpiar estado
            setUploadedImages([]);
            setSelectedPatient(null);
            toast.success(
              "Análisis completado. Puedes ver los resultados en la sección del paciente."
            );
          },
        });
      },
    });
  };

  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Análisis de Imágenes Médicas
              </h1>
              <p className="text-gray-600 mt-1">
                {selectedPatient
                  ? `Paciente: ${selectedPatient.personalInfo.fullName} (ID: ${selectedPatient.personalInfo.identification})`
                  : "Selecciona un paciente para comenzar"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Columna izquierda: Lista de pacientes */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Seleccionar Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Buscador y filtros */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por nombre o identificación..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={genderFilter} onValueChange={setGenderFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Lista de pacientes */}
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {patientsQuery.isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))
                  ) : filteredPatients.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No se encontraron pacientes
                    </div>
                  ) : (
                    filteredPatients.map((patient) => (
                      <button
                        key={patient.id}
                        onClick={() => setSelectedPatient(patient)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          selectedPatient?.id === patient.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {patient.personalInfo.fullName}
                            </p>
                            <p className="text-sm text-gray-600">
                              ID: {patient.personalInfo.identification}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {patient.personalInfo.age} años
                            </Badge>
                            <Badge
                              className={
                                patient.personalInfo.gender === "masculino"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-pink-100 text-pink-700"
                              }
                            >
                              {patient.personalInfo.gender}
                            </Badge>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sección de subir imágenes */}
            {selectedPatient && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    Subir Imágenes Médicas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Área de drop/upload */}
                  <label className="relative block">
                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.dcm,image/jpeg,image/png,application/dicom"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={uploadedImages.length >= 10}
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-700 font-medium mb-1">
                        Arrastra las imágenes aquí o haz clic para seleccionar
                      </p>
                      <p className="text-sm text-gray-500">
                        Formatos: JPEG, PNG, DICOM • Máx. 10MB por archivo
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {uploadedImages.length}/10 imágenes cargadas
                      </p>
                    </div>
                  </label>

                  {/* Lista de imágenes subidas */}
                  {uploadedImages.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-700">
                        Imágenes Subidas ({uploadedImages.length})
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {uploadedImages.map((img, index) => (
                          <div
                            key={index}
                            className="relative border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
                          >
                            <img
                              src={img.preview}
                              alt={img.name}
                              className="w-full h-32 object-cover"
                            />
                            <div className="p-3 bg-white">
                              <p className="text-xs font-medium text-gray-900 truncate">
                                {img.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatFileSize(img.size)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Botón de iniciar análisis */}
                  <Button
                    onClick={handleStartAnalysis}
                    disabled={
                      uploadedImages.length === 0 || isUploading || isAnalyzing
                    }
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    size="lg"
                  >
                    {isUploading || isAnalyzing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        {isUploading ? "Subiendo imágenes..." : "Analizando..."}
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Iniciar Análisis ML
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Columna derecha: Estado e información */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <ImageIcon className="h-5 w-5" />
                  Estado del Análisis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm text-gray-600">Paciente:</span>
                    <Badge
                      className={
                        selectedPatient
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }
                    >
                      {selectedPatient ? "Seleccionado" : "No seleccionado"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm text-gray-600">
                      Imágenes cargadas:
                    </span>
                    <Badge className="bg-blue-100 text-blue-700">
                      {uploadedImages.length}/10
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm text-gray-600">Estado:</span>
                    <Badge
                      className={
                        isUploading || isAnalyzing
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-500"
                      }
                    >
                      {isUploading
                        ? "Subiendo"
                        : isAnalyzing
                        ? "Analizando"
                        : "Esperando"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base">
                  Información del Análisis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <p>Algoritmo de deep learning especializado</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <p>Análisis de volumen cerebral y hipocampo</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <p>Detección de placas amiloides</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <p>Evaluación de grosor cortical</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <p>Comparación con base de datos normativa</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <p>Almacenamiento persistente de resultados</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
