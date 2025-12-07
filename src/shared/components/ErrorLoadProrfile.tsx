import { AlertCircle, RefreshCw, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ErrorLoadProfileProps {
  errorMessage?: string;
  onRetry?: () => void;
  onLogout?: () => void;
  onGoHome?: () => void;
}

export default function ErrorLoadProfile({
  errorMessage = "No se pudo cargar tu perfil",
  onRetry,
  onLogout,
  onGoHome,
}: ErrorLoadProfileProps) {
  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-destructive/10 p-3">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>

        <h1 className="text-2xl font-bold text-destructive mb-2">
          Error al cargar perfil
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {errorMessage}
        </p>

        <div className="flex flex-col gap-3">
          {onRetry && (
            <Button onClick={onRetry} size="lg" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Intentar de nuevo
            </Button>
          )}

          <div className="flex gap-2">
            {onGoHome && (
              <Button onClick={onGoHome} variant="outline" className="flex-1">
                <Home className="w-4 h-4" />
                Inicio
              </Button>
            )}
            {onLogout && (
              <Button
                onClick={onLogout}
                variant="destructive"
                className="flex-1"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
