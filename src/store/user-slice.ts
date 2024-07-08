import { StateCreator } from "zustand";

type UserState = {
  userName: string;
  fullName: string;
  age: number;
  address: string;
};

type UserActions = {
  setAddress: (address: string) => void;
};

export type UserSlice = UserState & UserActions;

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  address: "",
  age: 0,
  fullName: "",
  userName: "",
  setAddress: (address) => set(() => ({ address })),
});
