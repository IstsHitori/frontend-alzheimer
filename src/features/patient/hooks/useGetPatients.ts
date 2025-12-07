import { patientApi } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { usePatientStore } from "../store/patient.store";

export default function useGetPatients() {
  const patients = usePatientStore((state) => state.patients);
  const setPatients = usePatientStore((state) => state.setPatients);

  const patientsQuery = useQuery({
    queryKey: ["patients"],
    queryFn: patientApi.getAllPatients,
  });

  return { setPatients, patients, patientsQuery };
}
