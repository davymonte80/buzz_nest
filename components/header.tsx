"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Menu, User, LogOut, PenTool, Home } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">B</span>
          </div>
          <span className="hidden font-bold sm:inline-block text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            BuzzNest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className="transition-colors hover:text-primary flex items-center space-x-1"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/categories/technology"
            className="transition-colors hover:text-primary"
          >
            Technology
          </Link>
          <Link
            href="/categories/lifestyle"
            className="transition-colors hover:text-primary"
          >
            Lifestyle
          </Link>
          <Link
            href="/categories/health"
            className="transition-colors hover:text-primary"
          >
            Health
          </Link>
          <Link
            href="/categories/finance"
            className="transition-colors hover:text-primary"
          >
            Finance
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <Link href="/search">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>

          <ThemeToggle />

          {session ? (
            <div className="flex items-center space-x-2">
              {(session.user.role === "author" ||
                session.user.role === "admin") && (
                <Link href="/dashboard">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <PenTool className="h-4 w-4" />
                    <span className="sr-only">Dashboard</span>
                  </Button>
                </Link>
              )}

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || ""}
                  />
                  <AvatarFallback>
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut()}
                  className="rounded-full"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Sign out</span>
                </Button>
              </div>
            </div>
          ) : (
            <Link href="/auth/signin">
              <Button variant="default" size="sm" className="rounded-full">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t md:hidden bg-background/95 backdrop-blur-md"
          >
            <nav className="flex flex-col space-y-3 p-4">
              <Link
                href="/"
                className="transition-colors hover:text-primary flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/categories/technology"
                className="transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Technology
              </Link>
              <Link
                href="/categories/lifestyle"
                className="transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Lifestyle
              </Link>
              <Link
                href="/categories/health"
                className="transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Health
              </Link>
              <Link
                href="/categories/finance"
                className="transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Finance
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
