"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { isLeadStatus } from "@/lib/lead-schema";
import { prisma } from "@/lib/prisma";

async function ensureAdmin() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");
}

export async function updateLead(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !isLeadStatus(status)) {
    throw new Error("Demande ou statut invalide.");
  }

  await prisma.lead.update({
    where: { id },
    data: {
      status,
      readAt: new Date(),
    },
  });
  revalidatePath("/admin");
}

export async function toggleLeadRead(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id") ?? "");
  const isRead = formData.get("isRead") === "true";
  if (!id) throw new Error("Identifiant de demande manquant.");

  await prisma.lead.update({
    where: { id },
    data: { readAt: isRead ? null : new Date() },
  });
  revalidatePath("/admin");
}

export async function deleteLead(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Identifiant de demande manquant.");

  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function logoutAction() {
  const session = await getAdminSession();
  session.destroy();
  redirect("/admin/login");
}
