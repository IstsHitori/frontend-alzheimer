import { Activity, Brain } from "lucide-react";

interface WelcomeHeaderProps {
  doctorName: string;
}

export function WelcomeHeader({ doctorName }: WelcomeHeaderProps) {
  return (
    <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 md:p-8 animate-slide-down hover:shadow-xl transition-all duration-500">
      <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-3 animate-text-shimmer bg-linear-to-r from-primary via-secondary to-accent bg-clip-text bg-300% animate-gradient">
        Bienvenido, Dr. {doctorName}
      </h2>
      <p className="text-base md:text-xl text-muted-foreground animate-slide-up-delay">
        Sistema inteligente para el diagnóstico temprano de Alzheimer
      </p>
      <SystemStatus />
    </div>
  );
}

function SystemStatus() {
  return (
    <div className="mt-4 md:mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs md:text-sm animate-slide-up-delay-2">
      <div className="flex items-center gap-2 text-green-600 animate-bounce-subtle">
        <Activity className="h-4 w-4 animate-pulse" />
        Sistema operativo
      </div>
      <div className="flex items-center gap-2 text-primary animate-bounce-subtle-delay">
        <Brain className="h-4 w-4 animate-pulse-slow" />
        IA lista para análisis
      </div>
    </div>
  );
}
