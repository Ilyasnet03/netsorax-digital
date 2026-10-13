"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";
import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="login-form">
      <label className="form-field">
        <span>Adresse e-mail</span>
        <input name="email" type="email" autoComplete="username" required placeholder="admin@exemple.fr" />
      </label>
      <label className="form-field">
        <span>Mot de passe</span>
        <input name="password" type="password" autoComplete="current-password" required placeholder="••••••••••••" />
      </label>
      {state.error && <p className="form-alert" role="alert">{state.error}</p>}
      <button className="button button-primary login-submit" type="submit" disabled={isPending}>
        <LockKeyhole size={16} />
        {isPending ? "Connexion…" : "Se connecter"}
        {!isPending && <ArrowRight size={16} />}
      </button>
    </form>
  );
}
