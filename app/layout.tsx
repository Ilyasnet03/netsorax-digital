import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Netsorax — Ingénierie logicielle & intelligence artificielle",
  description:
    "Développement web, logiciels sur mesure et intelligence artificielle. Donnons vie aux idées qui font avancer votre activité.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
