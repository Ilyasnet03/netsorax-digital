import "server-only";
import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type AdminSession = {
  isLoggedIn: boolean;
  email: string;
};

function getSessionOptions(): SessionOptions {
  const password = process.env.SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 characters.");
  }

  return {
    password,
    cookieName: "netsorax_admin_session",
    cookieOptions: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    },
  };
}

export async function getAdminSession() {
  return getIronSession<AdminSession>(await cookies(), getSessionOptions());
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    const { redirect } = await import("next/navigation");
    redirect("/admin/login");
  }
  return session;
}
