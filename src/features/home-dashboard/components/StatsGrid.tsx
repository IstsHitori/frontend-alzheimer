import { BarChart3, BookOpen, Brain, Stethoscope } from "lucide-react";
import { StatCard, StatsCardSkeleton } from ".";

interface StatsGridProps {
  isLoading: boolean;
  stats: {
    analysisTotal: number;
    IAPresicion: number;
    patients: number;
    reports: number;
  };
}

export function StatsGrid({ isLoading, stats }: StatsGridProps) {
  if (isLoading) {
    return (
      <>
        {[...Array(4)].map((_, index) => (
          <StatsCardSkeleton key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      <StatCard
        title="Análisis hoy"
        value={stats.analysisTotal}
        subtitle="Analisis"
        icon={
          <Brain className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
        }
        bgColor="bg-primary/10"
        textColor="text-primary"
        subtitleColor="text-green-600"
      />

      <StatCard
        title="Precisión IA"
        value={`${stats.IAPresicion ?? 0}%`}
        subtitle="Excelente"
        icon={
          <BarChart3 className="h-6 w-6 text-secondary group-hover:scale-110 transition-transform" />
        }
        bgColor="bg-secondary/10"
        textColor="text-secondary"
        subtitleColor="text-green-600"
        animationDelay="-delay"
      />

      <StatCard
        title="Pacientes"
        value={stats.patients ?? 0}
        subtitle="Activos"
        icon={
          <Stethoscope className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
        }
        bgColor="bg-accent/10"
        textColor="text-accent"
        subtitleColor="text-blue-600"
        animationDelay="-delay-2"
      />

      <StatCard
        title="Reportes"
        value={stats.reports ?? 0}
        subtitle="Generados"
        icon={
          <BookOpen className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform" />
        }
        bgColor="bg-orange-100"
        textColor="text-orange-600"
        subtitleColor="text-purple-600"
        animationDelay="-delay-3"
      />
    </>
  );
}

