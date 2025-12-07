import { useUserStore } from "../store/user.store";

export function useUser() {
  const isAddUserOpen = useUserStore((state) => state.isAddUserOpen);
  const isEditUserOpen = useUserStore((state) => state.isEditUserOpen);
  const isDeleteAlertOpen = useUserStore((state) => state.isDeleteAlertOpen);
  const editingUser = useUserStore((state) => state.editingUser);
  const IdUserToDelete = useUserStore((state) => state.IdUserToDelete);
  const setIsAddUserOpen = useUserStore((state) => state.setIsAddUserOpen);
  const setIsEditUserOpen = useUserStore((state) => state.setIsEditUserOpen);
  const setIdUserToDelete = useUserStore((state) => state.setIdUserToDelete);
  const setEditingUser = useUserStore((state) => state.setEditingUser);

  const setIsDeleteAlertOpen = useUserStore(
    (state) => state.setIsDeleteAlertOpen
  );
  return {
    isAddUserOpen,
    isEditUserOpen,
    isDeleteAlertOpen,
    IdUserToDelete,
    editingUser,
    setIsAddUserOpen,
    setIsEditUserOpen,
    setIsDeleteAlertOpen,
    setIdUserToDelete,
    setEditingUser,
  };
}
