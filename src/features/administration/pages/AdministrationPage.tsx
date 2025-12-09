import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  AddUserModal,
  AlertDialogDeleteUser,
  EditUserModal,
} from "../components";
import { useGetUsers } from "../hooks";
import UserCard from "../components/user/UserCard";
import UsersEmpty from "../components/user/UsersEmpty";
import UserCardSkeleton from "../components/user/UserCardSkeleton";
import { Card } from "@/components/ui/card";

export default function AdministrationPage() {
  const [userSearchQuery, setUserSearchQuery] = useState("");

  const {
    usersQuery: { data, isLoading },
  } = useGetUsers();

  const filteredUsers = data?.filter((user) => {
    const query = userSearchQuery.toLowerCase();

    return (
      user.name.toLowerCase().includes(query) ||
      user.userName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <Card className="bg-white border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Gestión de Usuarios
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Administra los usuarios del sistema
            </p>
          </div>
          <AddUserModal />
        </div>
      </Card>

      <Card className="bg-white border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nombre o nombre de usuario..."
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
      </Card>

      <EditUserModal />

      <AlertDialogDeleteUser />

      <div className="grid gap-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))
        ) : filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <UsersEmpty />
        )}
      </div>
    </div>
  );
}
