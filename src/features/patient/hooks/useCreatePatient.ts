import { useState } from "react";

export function useCreatePatient() {
  const [isCreating, setIscreating] = useState(false);
  return { isCreating, setIscreating };
}
