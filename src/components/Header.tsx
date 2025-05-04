"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Laptop, LogOut, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SIgninDialog from "./SIgnin.Dialog";

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [showSignIn, setShowSignIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getUserInitials = () => {
    if (!session?.user?.name) return "U";
    const nameParts = session.user.name.split(" ");
    if (nameParts.length === 1) return nameParts[0][0];
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`;
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-gray-200 bg-background/80 backdrop-blur dark:border-gray-800"
          : "bg-background"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo - Visible on all screens */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">🧠</span>
          <span className="hidden sm:inline-block font-semibold">
            YourBrand
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 rounded-md border px-2 py-1">
          <Link
            href="/pricing"
            className="font-medium text-sm px-3 py-1 rounded hover:bg-accent transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/accounts"
            className="font-medium text-sm px-3 py-1 rounded hover:bg-accent transition-colors"
          >
            Accounts
          </Link>
          <Link
            href="/blog"
            className="font-medium text-sm px-3 py-1 rounded hover:bg-accent transition-colors"
          >
            Blog
          </Link>

          {/* Theme Toggle - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1">
                {resolvedTheme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : resolvedTheme === "light" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Laptop className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Laptop className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Navigation Dropdown */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" side="bottom">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/pricing" className="w-full">
                    Pricing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/accounts" className="w-full">
                    Accounts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog" className="w-full">
                    Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="w-full">
                    Contact
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* User/Auth Section */}
        <div className="flex items-center gap-2">
          <Link href="/contact" className="hidden md:block">
            <Button
              variant="outline"
              size="sm"
              className="px-3 hover:bg-accent transition-colors"
            >
              Build
            </Button>
          </Link>

          {isLoading ? (
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage
                    src={session.user?.image || undefined}
                    alt={session.user?.name || "User"}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user?.name && (
                      <p className="font-medium">{session.user.name}</p>
                    )}
                    {session.user?.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="default"
                size="sm"
                className="hidden md:flex bg-black text-white dark:bg-white dark:text-black px-3 hover:bg-gray-800 transition-colors"
                onClick={() => setShowSignIn(true)}
              >
                Sign In
              </Button>

              {/* Mobile Sign In Button */}
              <Button
                variant="default"
                size="icon"
                className="md:hidden bg-black text-white dark:bg-white dark:text-black"
                onClick={() => setShowSignIn(true)}
              >
                <User className="h-4 w-4" />
              </Button>

              <SIgninDialog
                openDialog={showSignIn}
                closeDialog={setShowSignIn}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
