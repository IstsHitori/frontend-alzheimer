import { Activity, Brain } from "lucide-react";

interface WelcomeHeaderProps {
  doctorName: string;
}

export function WelcomeHeader({ doctorName }: WelcomeHeaderProps) {
  return (
    <div className="bg-linear-to-r from-blue-100 to-blue-50 rounded-2xl p-8 md:p-10 animate-slide-down hover:shadow-xl transition-all duration-500">
      <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2 animate-slide-down">
        Bienvenido, Dr. {doctorName}
      </h2>
      <p className="text-base md:text-lg text-gray-600 animate-slide-up-delay font-light">
        Sistema inteligente para el diagnóstico temprano de Alzheimer
      </p>
      <SystemStatus />
    </div>
  );
}

function SystemStatus() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs md:text-sm animate-slide-up-delay-2">
      <div className="flex items-center gap-2 text-green-600 font-medium">
        <Activity className="h-4 w-4 animate-pulse" />
        Sistema operativo
      </div>
      <div className="flex items-center gap-2 text-primary font-medium">
        <Brain className="h-4 w-4 animate-pulse-slow" />
        IA lista para análisis
      </div>
    </div>
  );
}
