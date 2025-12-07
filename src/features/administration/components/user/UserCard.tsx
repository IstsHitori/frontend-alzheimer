import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import type { UpdateUser, User } from "../../types/user.types";
import { useUser } from "../../hooks";
import type { USER_ROLE } from "../../schemas/user.schemas";

type UserCardProps = {
  user: User;
};
export default function UserCard({ user }: UserCardProps) {
  const {
    setIsEditUserOpen,
    setEditingUser,
    setIsDeleteAlertOpen,
    setIdUserToDelete,
  } = useUser();

  const { id, userName, name, email, role, lastAcces } = user;

  const userToUpdate: UpdateUser = {
    id,
    name,
    userName,
    email,
    password: "",
    role: role as USER_ROLE,
  };
  return (
    <Card key={user.id}>
      <CardContent className="p-3 md:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1 flex-1 w-full">
            <h3 className="font-semibold text-sm md:text-base">{user.name}</h3>
            <p className="text-xs md:text-sm text-muted-foreground break-all">
              @{userName} • {email}
            </p>
            <p className="text-xs text-muted-foreground">
              Último acceso:{" "}
              {lastAcces ? lastAcces.toLocaleString() : "Sin acceso aùn"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <Badge variant={"default"} className="text-xs">
              {"ACTIVO"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {user.role === "admin" ? "Admin" : "Médico"}
            </Badge>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingUser(userToUpdate);
                  setIsEditUserOpen(true);
                }}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsDeleteAlertOpen(true);
                  setIdUserToDelete(user.id);
                }}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
