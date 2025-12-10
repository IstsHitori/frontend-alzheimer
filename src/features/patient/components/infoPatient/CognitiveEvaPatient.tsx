import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain, Edit } from "lucide-react";
import type { Patient, UpdateCognitiveEvaluation } from "../../types";
import { formatDate } from "../../helpers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUpdateCognitiveEva } from "../../hooks/useUpdateCognitiveEva";
import { toast } from "sonner";

type CognitiveEvaPatientProps = {
  cognitiveEvaluation: Patient["cognitiveEvaluation"];
  patientId: Patient["id"];
};

export function CognitiveEvaPatient({
  cognitiveEvaluation,
  patientId,
}: CognitiveEvaPatientProps) {
  const [open, setOpen] = useState(false);
  const [mmse, setMmse] = useState(cognitiveEvaluation.mmse);
  const [moca, setMoca] = useState(cognitiveEvaluation.moca);
  const { mutate } = useUpdateCognitiveEva();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mmse < 0 || mmse > 30) {
      toast.error("El MMSE debe estar entre 0 y 30");
      return;
    }
    if (moca < 0 || moca > 30) {
      toast.error("El MoCA debe estar entre 0 y 30");
      return;
    }

    const newEvaluation: UpdateCognitiveEvaluation = {
      mmse,
      moca,
    };

    mutate(
      { newEvaluation, patientId },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setMmse(cognitiveEvaluation.mmse);
    setMoca(cognitiveEvaluation.moca);
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Evaluación Cognitiva</CardTitle>
        <div className="flex items-center gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="text-indigo-600 border-indigo-300 hover:bg-indigo-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-indigo-600" />
                    Editar Evaluación Cognitiva
                  </DialogTitle>
                  <DialogDescription>
                    Actualiza los valores de MMSE y MoCA para este paciente.
                    Los valores deben estar entre 0 y 30.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mmse" className="text-sm font-semibold">
                      MMSE (Mini-Mental State Examination)
                    </Label>
                    <Input
                      id="mmse"
                      type="number"
                      min="0"
                      max="30"
                      value={mmse}
                      onChange={(e) => setMmse(Number(e.target.value))}
                      className="col-span-3"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Puntuación actual: {cognitiveEvaluation.mmse}/30
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="moca" className="text-sm font-semibold">
                      MoCA (Montreal Cognitive Assessment)
                    </Label>
                    <Input
                      id="moca"
                      type="number"
                      min="0"
                      max="30"
                      value={moca}
                      onChange={(e) => setMoca(Number(e.target.value))}
                      className="col-span-3"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Puntuación actual: {cognitiveEvaluation.moca}/30
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Guardar cambios
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Brain className="text-indigo-600" size={20} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-600">MMSE</p>
            <p className="text-3xl font-bold text-indigo-600">
              {cognitiveEvaluation.mmse}/30
            </p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-600">MoCA</p>
            <p className="text-3xl font-bold text-indigo-600">
              {cognitiveEvaluation.moca}/30
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">Última Actualización</p>
          <p className="font-semibold">
            {formatDate(cognitiveEvaluation.updatedAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
