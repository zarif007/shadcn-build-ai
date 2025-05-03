import { createContext } from "react";

type MessagesContextType = {
  messages: string[];
  setMessages: (messages: { role: string; content: string }) => void;
};

export const MessagesContext = createContext<MessagesContextType>({
  messages: [],
  setMessages: (messages) => {},
});
