import { IUserDetails } from "@/types/userDetails";
import { createContext } from "react";

export const UserDetailContext = createContext<{
  userDetails: IUserDetails | null;
  setUserDetails: (userDetails: IUserDetails | null) => void;
}>({
  userDetails: null,
  setUserDetails: () => {},
});
