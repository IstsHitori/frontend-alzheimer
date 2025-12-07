import { Card, CardContent } from "@/components/ui/card";

export default function UsersEmpty() {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <p className="text-muted-foreground">
          No se encontraron usuarios que coincidan con la búsqueda
        </p>
      </CardContent>
    </Card>
  );
}
