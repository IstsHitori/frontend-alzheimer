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
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-lg md:text-xl font-semibold">
          Gestión de Usuarios
        </h2>
        <AddUserModal />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o nombre de usuario..."
          value={userSearchQuery}
          onChange={(e) => setUserSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

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
