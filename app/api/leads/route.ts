import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Le formulaire envoyé est invalide." },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Vérifiez les champs du formulaire.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { company, phone, budget, deadline, ...requiredFields } = parsed.data;

  try {
    await prisma.lead.create({
      data: {
        ...requiredFields,
        company: company || null,
        phone: phone || null,
        budget: budget || null,
        deadline: deadline || null,
      },
    });
  } catch (error) {
    console.error("Failed to save a project inquiry.", error);
    return NextResponse.json(
      { message: "Impossible d’enregistrer votre demande. Réessayez plus tard." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Votre demande a bien été envoyée." },
    { status: 201 },
  );
}
