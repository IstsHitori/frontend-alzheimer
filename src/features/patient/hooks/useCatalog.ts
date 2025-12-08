import { useCatalogStore } from "../store";

export function useCatalog() {
  const epsList = useCatalogStore((state) => state.epsList);
  const conditions = useCatalogStore((state) => state.conditions);
  const medications = useCatalogStore((state) => state.medications);
  const setEpsList = useCatalogStore((state) => state.setEpsList);
  const setConditions = useCatalogStore((state) => state.setConditions);
  const setMedications = useCatalogStore((state) => state.setMedications);

  return {
    epsList,
    conditions,
    medications,
    setEpsList,
    setConditions,
    setMedications,
  };
}
