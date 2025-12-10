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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useGetPatients from "@/features/patient/hooks/useGetPatients";
import type { Patient } from "@/features/patient/types";
import { Skeleton } from "@/components/ui/skeleton";
import useUploadImage from "../hooks/useUploadImage";
import useAnylzeImages from "../hooks/useAnylzeImages";
import type {
  AnalyzePyload,
  ImageToAnlize,
  CreateAnalysisRespnse,
} from "../types";
import { toast } from "sonner";
import { ImageAnalysisPatient } from "@/features/patient/components/analysisPatient";
import { ModalImage } from "@/features/patient/components/analysisPatient/ModalImage";
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
  const [analysisResult, setAnalysisResult] =
    useState<CreateAnalysisRespnse | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    fileName: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // Calcular paginación
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  
  // Ajustar currentPage si excede el totalPages después de filtrar
  const effectiveCurrentPage = useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      // Si la página actual excede el total, ajustar
      setTimeout(() => setCurrentPage(totalPages), 0);
      return totalPages;
    }
    return currentPage;
  }, [currentPage, totalPages]);

  const paginatedPatients = useMemo(() => {
    const startIndex = (effectiveCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPatients.slice(startIndex, endIndex);
  }, [filteredPatients, effectiveCurrentPage]);

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
          onSuccess: (result) => {
            // Guardar resultado del análisis
            setAnalysisResult(result);
            // Limpiar imágenes
            setUploadedImages([]);
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

  // Iniciar nuevo análisis
  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setSelectedPatient(null);
    setUploadedImages([]);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mostrar resultados si existen */}
        {analysisResult ? (
          <div className="space-y-6">
            {/* Header de resultados */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500 rounded">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Análisis #{analysisResult.id}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Paciente: {analysisResult.patient.fullName} • ID:{" "}
                    {analysisResult.patient.identification}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleNewAnalysis}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Brain className="h-5 w-5 mr-2" />
                Nuevo Análisis
              </Button>
            </div>

            {/* Card contenedor de resultados - igual que AnalysisCardPatient */}
            <Card className="border border-gray-200 shadow-sm overflow-hidden bg-white">
              {/* Header del análisis */}
              <CardHeader className="pb-3 pt-4 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-gray-900">
                        Análisis #{analysisResult.id}
                      </CardTitle>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(analysisResult.createdAt).toLocaleDateString(
                          "es-ES"
                        )}{" "}
                        • {analysisResult.user.name}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500 text-white border-0 text-xs">
                    {analysisResult.user.role}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="px-4 sm:px-6 pb-6">
                {/* Imágenes analizadas usando el componente existente */}
                {analysisResult.imageAnalysis.length > 0 ? (
                  <div className="space-y-6">
                    {analysisResult.imageAnalysis.map((imgAnalysis) => (
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
            </Card>

            {/* Información adicional */}
            <Card className="border-0 shadow-lg bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <ImageIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Análisis realizado por {analysisResult.user.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Rol: {analysisResult.user.role} • Fecha:{" "}
                      {new Date(analysisResult.createdAt).toLocaleString(
                        "es-ES"
                      )}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Total de imágenes analizadas:{" "}
                      <span className="font-semibold">
                        {analysisResult.imageAnalysis.length}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modal para ver imagen completa */}
            {selectedImage && (
              <ModalImage
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            )}
          </div>
        ) : (
          // Vista de selección y upload (original)
          <>
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
                      <Select
                        value={genderFilter}
                        onValueChange={setGenderFilter}
                      >
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
                        paginatedPatients.map((patient) => (
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

                    {/* Paginador */}
                    {filteredPatients.length > itemsPerPage && (
                      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          Mostrando {(effectiveCurrentPage - 1) * itemsPerPage + 1} a{" "}
                          {Math.min(effectiveCurrentPage * itemsPerPage, filteredPatients.length)} de{" "}
                          {filteredPatients.length} pacientes
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPage(effectiveCurrentPage - 1)}
                            disabled={effectiveCurrentPage === 1}
                            className="h-8"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <Button
                                key={page}
                                size="sm"
                                variant={effectiveCurrentPage === page ? "default" : "outline"}
                                onClick={() => setCurrentPage(page)}
                                className={`h-8 w-8 p-0 ${
                                  effectiveCurrentPage === page
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : ""
                                }`}
                              >
                                {page}
                              </Button>
                            ))}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPage(effectiveCurrentPage + 1)}
                            disabled={effectiveCurrentPage === totalPages}
                            className="h-8"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
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
                            Arrastra las imágenes aquí o haz clic para
                            seleccionar
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
                          uploadedImages.length === 0 ||
                          isUploading ||
                          isAnalyzing
                        }
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        size="lg"
                      >
                        {isUploading || isAnalyzing ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            {isUploading
                              ? "Subiendo imágenes..."
                              : "Analizando..."}
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
                <Card className="border-0 shadow-lg bg-linear-to-br from-blue-50 to-white">
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
          </>
        )}
      </div>
    </div>
  );
}
