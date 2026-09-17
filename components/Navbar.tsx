"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between px-6 md:px-10 h-16 bg-[#07090E]/80 backdrop-blur-xl border-b border-white/[0.06]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 shrink-0 md:justify-self-start">
        <Image
          src="/images/logo/LogoNoBG.png"
          alt="LodgeTrack logo"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
        <span className="text-lg font-semibold tracking-tight text-white">
          Lodge<span className="text-[#36BFAE]">Track</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/5"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Desktop CTA — disabled while the product is in pre-launch */}
      <div className="hidden md:flex items-center md:justify-self-end">
        <Button variant="glass" disabled className="text-sm px-5 py-2 h-9">
          Launching soon
        </Button>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-slate-400 hover:text-white transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-[#07090E]/95 backdrop-blur-xl border-b border-white/[0.06] md:hidden p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white font-medium py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="glass"
              disabled
              className="text-sm w-full"
            >
              Launching soon
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
