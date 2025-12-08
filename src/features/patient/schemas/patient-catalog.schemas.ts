import z from "zod";

export const epsSchema = z.object({
  id: z.number(),
  nit: z.number(),
  isActive: z.boolean(),
  entity: z.string(),
  code: z.string(),
  mobilityCode: z.string(),
  regime: z.string(),
});

export const arrayEpsSchema = z.array(epsSchema);

export const medicationSchema = z.object({
  id: z.number(),
  product: z.string(),
  expedient: z.string(),
  headline: z.string(),
  healthRegistry: z.string(),
  commercialDescription: z.string(),
  atc: z.string(),
  descriptionAtc: z.string(),
  medicalSample: z.boolean(),
  viaAdministration: z.string(),
  unitMeasurement: z.string(),
  quantity: z.number(),
  referenceUnit: z.string(),
  pharmaceuticalForm: z.string(),
});

export const arrayMedicationSchema = z.array(medicationSchema);

export const conditionSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
  extra: z.string(),
});

export const arrayConditionSchema = z.array(conditionSchema);
