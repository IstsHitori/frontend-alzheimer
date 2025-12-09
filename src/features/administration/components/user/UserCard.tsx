import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit, Trash2, User } from "lucide-react";
import type { UpdateUser, User as UserType } from "../../types/user.types";
import { useUser } from "../../hooks";
import type { USER_ROLE } from "../../schemas/user.schemas";

type UserCardProps = {
  user: UserType;
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
    role: role as USER_ROLE,
  };
  return (
    <Card key={user.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4 flex flex-row items-start justify-between space-y-0">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600 break-all">
              @{userName} • {email}
            </p>
          </div>
        </div>
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
            <Edit className="h-3.5 w-3.5" />
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
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-xs text-gray-600">
            Último acceso:{" "}
            <span className="text-gray-900 font-medium">
              {lastAcces ? lastAcces.toLocaleString() : "Sin acceso aún"}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="text-xs bg-blue-100 text-blue-900 hover:bg-blue-100">
              ACTIVO
            </Badge>
            <Badge variant="outline" className="text-xs">
              {user.role === "admin" ? "Admin" : "Médico"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
