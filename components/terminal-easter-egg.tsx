"use client";

import { CornerDownLeft, Terminal as TerminalIcon, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type TerminalEntry = {
  command: string;
  output: string;
  showContact?: boolean;
};

const initialEntry: TerminalEntry = {
  command: "netsorax --interactive",
  output: "Bienvenue dans le terminal Netsorax. Tapez « help » pour découvrir les commandes.",
};

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([initialEntry]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = document.querySelector<HTMLDialogElement>("#netsorax-terminal");
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [entries]);

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;

    const normalized = command.toLowerCase();
    let output: string;
    let showContact = false;

    switch (normalized) {
      case "help":
        output = "help      afficher les commandes\nskills    voir les domaines techniques\ncontact   afficher les coordonnées\nclear     effacer l’écran\nsudo hire-ilyas   proposer une collaboration";
        break;
      case "skills":
        output = "Ingénierie web · React, Next.js, TypeScript\nIA & vision · Machine learning, traitement d’image\nMobile · Flutter, Dart\nAPI & cloud · Java, Spring Boot, PostgreSQL";
        break;
      case "contact":
      case "sudo hire-ilyas":
        output = normalized.startsWith("sudo")
          ? "Permission accordée (dans cette simulation). Prêt à discuter d’un projet ?"
          : "Pour parler d’une idée ou d’une collaboration :";
        showContact = true;
        break;
      case "clear":
        setEntries([]);
        setInput("");
        setHistoryIndex(-1);
        return;
      case "whoami":
        output = "Visiteur curieux · session locale · aucune commande système exécutée.";
        break;
      default:
        output = `Commande inconnue : ${command}\nTapez « help » pour afficher les commandes disponibles.`;
    }

    setEntries((current) => [...current, { command, output, showContact }]);
    setCommandHistory((current) => [...current, command]);
    setHistoryIndex(-1);
    setInput("");
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = Math.max(0, historyIndex < 0 ? commandHistory.length - 1 : historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] ?? "");
    } else if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex >= commandHistory.length ? -1 : nextIndex);
      setInput(commandHistory[nextIndex] ?? "");
    }
  }

  return (
    <>
      <button
        className="terminal-launcher"
        type="button"
        aria-label="Ouvrir le terminal interactif"
        title="Terminal interactif"
        onClick={() => setIsOpen(true)}
      >
        <TerminalIcon size={17} aria-hidden="true" /><span aria-hidden="true">&gt;_</span>
      </button>
      <dialog
        className="terminal-dialog"
        id="netsorax-terminal"
        aria-labelledby="terminal-title"
        onClose={() => setIsOpen(false)}
      >
        <div className="terminal-window">
          <header className="terminal-titlebar">
            <span className="terminal-brand"><TerminalIcon size={15} /> <span id="terminal-title">NETSORAX · TERMINAL</span></span>
            <span className="terminal-window-dots" aria-hidden="true"><i /><i /><i /></span>
            <button className="terminal-close" type="button" aria-label="Fermer le terminal" onClick={() => setIsOpen(false)}><X size={17} /></button>
          </header>
          <div className="terminal-output" ref={outputRef} aria-live="polite">
            {entries.map((entry, index) => (
              <div className="terminal-entry" key={`${index}-${entry.command}`}>
                <p className="terminal-command"><span>ilyas@netsorax</span>:<span>~</span>$ {entry.command}</p>
                <pre>{entry.output}</pre>
                {entry.showContact && (
                  <p className="terminal-contact">
                    <a href="mailto:productownerchip@gmail.com">productownerchip@gmail.com</a>
                    <a href="tel:+212625963977">+212 6 25 96 39 77</a>
                  </p>
                )}
              </div>
            ))}
          </div>
          <form className="terminal-form" onSubmit={runCommand}>
            <label className="terminal-prompt" htmlFor="terminal-command-input">ilyas@netsorax:~$</label>
            <input
              ref={inputRef}
              id="terminal-command-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              autoComplete="off"
              spellCheck={false}
              aria-label="Commande du terminal"
            />
            <button type="submit" aria-label="Exécuter la commande"><CornerDownLeft size={16} /></button>
          </form>
          <p className="terminal-hint">Entrée pour exécuter · ↑↓ historique · Échap pour fermer</p>
        </div>
      </dialog>
    </>
  );
}
