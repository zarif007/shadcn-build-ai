"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ThemeProvider } from "../components/providers";
import { MessagesContext } from "@/context/messagesContext";
import { UserDetailContext } from "@/context/userDetailContext";
import { useSession } from "next-auth/react";
import { IUserDetails } from "@/types/userDetails";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  const [messages] = useState([]);
  const setMessages = (message: { role: string; content: string }) => {};

  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      setUserDetails({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      });
    }
  }, [session]);

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

export default ClientProviders;
