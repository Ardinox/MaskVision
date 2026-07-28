"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { ModeToggle } from "./ThemeToggle";
import HomeLogo from "../../public/dark.svg";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto m-4 rounded-4xl bg-blue-700 transition-all duration-300 text-white dark:bg-zinc-900/60 shadow-lg">
        <div className="flex justify-between p-5 h-16 gap-3 text-lg items-center">
          <Link
            href="/"
            className="flex gap-1 text-white transition-colors hover:text-blue-200 dark:hover:text-blue-300"
          >
            <Image
              src={HomeLogo}
              alt="MaskVision Logo"
              className="w-24 md:w-24 lg:w-28 h-auto transition-transform duration-200 hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-full px-4 py-2 transition-all duration-300 ${
                    active
                      ? "bg-white dark:bg-gray-200 text-blue-700 dark:text-gray-700 font-semibold shadow-md"
                      : "text-white hover:bg-white/10 hover:text-blue-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden hover:text-blue-200 dark:hover:text-gray-300 transition-transform duration-200 hover:scale-110"
            >
              {open ? <X /> : <Menu />}
            </button>

            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden max-w-7xl mx-auto rounded-2xl bg-blue-700/50 text-white dark:bg-zinc-900/30 shadow-lg transition-all duration-200">
          <div className="flex flex-col p-5 gap-3">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2 transition-all duration-300 ${
                    active
                      ? "bg-white text-blue-700 font-semibold"
                      : "hover:bg-white/10 hover:text-blue-200"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;