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
    <html lang="fr" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t="dark";try{var s=localStorage.getItem("netsorax-theme");if(s==="light"||s==="dark")t=s;else if(window.matchMedia("(prefers-color-scheme: light)").matches)t="light"}catch(e){console.error("Impossible de lire la préférence de thème.",e)}document.documentElement.dataset.theme=t})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
