import { catalogApi } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetCatalog() {
  const epsQuery = useQuery({
    queryKey: ["eps"],
    queryFn: catalogApi.getAllEps,
  });

  const conditionsQuery = useQuery({
    queryKey: ["conditions"],
    queryFn: catalogApi.getAllConditions,
  });

  const medicationsQuery = useQuery({
    queryKey: ["medications"],
    queryFn: catalogApi.getAllMedicatios,
  });

  return { epsQuery, conditionsQuery, medicationsQuery };
}
