import { createContext } from "react";

export const UserDetailContext = createContext<{
  userDetails: any;
  setUserDetails: (userDetails: any) => void;
}>({
  userDetails: [],
  setUserDetails: (userDetails) => {},
});
