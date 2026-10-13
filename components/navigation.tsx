"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Expertises", href: "#expertises" },
  { label: "Projets", href: "#projets" },
  { label: "À propos", href: "#apropos" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Navigation principale">
        <Link className="wordmark" href="/" aria-label="Netsorax, accueil">
          <span className="brand-mark">N</span>
          <span>Netsorax<span className="brand-dot">.</span></span>
        </Link>

        <div className="desktop-links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </div>

        <a className="nav-cta" href="#contact">
          Parlons de votre projet <ArrowUpRight size={15} />
        </a>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      {isOpen && (
        <div className="mobile-menu">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)}>Démarrer un projet ↗</a>
        </div>
      )}
    </header>
  );
}
