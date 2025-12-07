import { create } from "zustand";
import type { UpdateUser, User } from "../types/user.types";

interface UserState {
  isAddUserOpen: boolean;
  isEditUserOpen: boolean;
  isDeleteAlertOpen: boolean;
  editingUser: UpdateUser;
  IdUserToDelete: User["id"];
}

interface UserActions {
  setIsAddUserOpen: (isAddUserOpen: boolean) => void;
  setIsEditUserOpen: (isEditUserOpen: boolean) => void;
  setIsDeleteAlertOpen: (isDeleteAlertOpen: boolean) => void;
  setEditingUser: (editingUser: UpdateUser) => void;
  setIdUserToDelete: (IdUserToDelete: User["id"]) => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  isAddUserOpen: false,
  isEditUserOpen: false,
  isDeleteAlertOpen: false,
  editingUser: {} as UpdateUser,
  IdUserToDelete: "",
  setIsAddUserOpen: (isAddUserOpen) => set({ isAddUserOpen }),
  setIsEditUserOpen: (isEditUserOpen) => set({ isEditUserOpen }),
  setIsDeleteAlertOpen: (isDeleteAlertOpen) => set({ isDeleteAlertOpen }),
  setEditingUser: (editingUser) => set({ editingUser }),
  setIdUserToDelete: (IdUserToDelete: User["id"]) => set({ IdUserToDelete }),
}));
