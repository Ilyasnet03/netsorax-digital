"use client";

import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TerminalEasterEgg } from "@/components/terminal-easter-egg";

const links = [
  { label: "Expertises", href: "#expertises" },
  { label: "Méthode", href: "#methode" },
  { label: "Lab", href: "#lab" },
  { label: "Projets", href: "#projets" },
  { label: "À propos", href: "#apropos" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("netsorax-theme", nextTheme);
    } catch (error) {
      console.error("Impossible d’enregistrer la préférence de thème.", error);
    }
  }

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

        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label="Changer de thème"
            title="Changer de thème"
          >
            <Sun className="theme-icon-sun" size={17} aria-hidden="true" />
            <Moon className="theme-icon-moon" size={17} aria-hidden="true" />
          </button>
          <TerminalEasterEgg />
          <a className="nav-cta" href="#contact">
            Parlons du projet <ArrowUpRight size={15} />
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
        </div>
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
