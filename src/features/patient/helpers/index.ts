export const formatDate = (
  date: string,
  day: "numeric" | "2-digit" = "numeric"
) =>
  new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day,
  });
