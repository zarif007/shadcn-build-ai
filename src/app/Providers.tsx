"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { ThemeProvider } from "../components/providers";
import { MessagesContext } from "@/context/messagesContext";
import { UserDetailContext } from "@/context/userDetailContext";
import { User } from "lucide-react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [messages] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const setMessages = (message: { role: string; content: string }) => {};

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <MessagesContext.Provider value={{ messages, setMessages }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </MessagesContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default Providers;
