"use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";

export type LoginState = { error: string | null };

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordHash = Buffer.from(
    process.env.ADMIN_PASSWORD_HASH_B64 ?? "",
    "base64",
  ).toString("utf8");

  if (!adminEmail || passwordHash.length !== 60 || !passwordHash.startsWith("$2")) {
    console.error("Admin login is not configured.");
    return { error: "La connexion administrateur n’est pas configurée." };
  }
  if (!email || !password || email !== adminEmail) {
    return { error: "Adresse e-mail ou mot de passe invalide." };
  }

  let isValid = false;
  try {
    isValid = await compare(password, passwordHash);
  } catch (error) {
    console.error("Failed to verify the admin password hash.", error);
    return { error: "La connexion est temporairement indisponible." };
  }

  if (!isValid) return { error: "Adresse e-mail ou mot de passe invalide." };

  const session = await getAdminSession();
  session.isLoggedIn = true;
  session.email = adminEmail;
  await session.save();
  redirect("/admin");
}
