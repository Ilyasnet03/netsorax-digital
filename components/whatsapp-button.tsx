import { MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/212625963977?text=Bonjour%20Netsorax%2C%20je%20souhaite%20parler%20d%E2%80%99un%20projet.";

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter Netsorax sur WhatsApp"
      title="Écrivez-nous sur WhatsApp"
    >
      <MessageCircle size={20} strokeWidth={2} aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
