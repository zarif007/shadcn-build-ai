"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/providers";
import { MessagesContext } from "@/context/messagesContext";
import { UserDetailContext } from "@/context/userDetailContext";
import { createClient } from "@/lib/supabase/client";
import { IUserDetails } from "@/types/userDetails";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  const [messages] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setMessages = (message: { role: string; content: string }) => {};

  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData?.user) {
        setUserDetails(null);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, updated_at")
        .eq("id", userData.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        setUserDetails(null);
        return;
      }

      setUserDetails(data);
    };

    fetchUserDetails();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          fetchUserDetails();
        } else if (event === "SIGNED_OUT") {
          setUserDetails(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

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
