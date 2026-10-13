import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { getAdminSession } from "@/lib/auth";

export const metadata = {
  title: "Connexion administrateur — Netsorax",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session.isLoggedIn) redirect("/admin");

  return (
    <main className="admin-login-page">
      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />
      <Link className="wordmark login-brand" href="/"><span className="brand-mark">N</span><span>Netsorax<span className="brand-dot">.</span></span></Link>
      <section className="login-panel">
        <div className="login-icon"><ShieldCheck size={22} /></div>
        <span className="section-kicker">ESPACE PRIVÉ</span>
        <h1>Bon retour.</h1>
        <p>Connectez-vous pour retrouver vos demandes de projet.</p>
        <LoginForm />
        <Link className="back-link" href="/"><ArrowLeft size={14} /> Retour au site</Link>
      </section>
      <span className="login-caption">NETSORAX · ESPACE ADMINISTRATEUR</span>
    </main>
  );
}
