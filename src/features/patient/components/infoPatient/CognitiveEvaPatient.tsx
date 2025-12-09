import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";
import type { Patient } from "../../types";
type CognitiveEvaPatientProps = {
  cognitiveEvaluation: Patient["cognitiveEvaluation"];
};
export function CognitiveEvaPatient({
  cognitiveEvaluation,
}: CognitiveEvaPatientProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Evaluación Cognitiva</CardTitle>
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Brain className="text-indigo-600" size={20} />
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
            {new Date(cognitiveEvaluation.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
