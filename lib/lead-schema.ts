import { z } from "zod";

export const leadServices = [
  "WEBSITE",
  "SOFTWARE",
  "AI",
  "CONSULTING",
  "OTHER",
] as const;

export const leadServiceLabels: Record<(typeof leadServices)[number], string> = {
  WEBSITE: "Site web",
  SOFTWARE: "Logiciel sur mesure",
  AI: "IA / Machine learning",
  CONSULTING: "Conseil technique",
  OTHER: "Autre",
};

export const leadStatuses = ["NEW", "IN_PROGRESS", "COMPLETED"] as const;

export const leadStatusLabels: Record<(typeof leadStatuses)[number], string> = {
  NEW: "Nouveau",
  IN_PROGRESS: "En cours",
  COMPLETED: "Traité / devis envoyé",
};

export type LeadService = (typeof leadServices)[number];
export type LeadStatus = (typeof leadStatuses)[number];

export function isLeadService(value: string): value is LeadService {
  return leadServices.some((service) => service === value);
}

export function isLeadStatus(value: string): value is LeadStatus {
  return leadStatuses.some((status) => status === value);
}

export function getLeadServiceLabel(value: string) {
  if (!isLeadService(value)) throw new Error(`Unknown lead service: ${value}`);
  return leadServiceLabels[value];
}

export function getLeadStatusLabel(value: string) {
  if (!isLeadStatus(value)) throw new Error(`Unknown lead status: ${value}`);
  return leadStatusLabels[value];
}

export const leadSchema = z.object({
  firstName: z.string().trim().min(2, "Indiquez votre prénom.").max(80),
  lastName: z.string().trim().min(2, "Indiquez votre nom.").max(80),
  company: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email("Adresse e-mail invalide.").max(254),
  phone: z.string().trim().max(40).optional().default(""),
  service: z.enum(leadServices, {
    error: "Sélectionnez le type de service souhaité.",
  }),
  description: z
    .string()
    .trim()
    .min(20, "Décrivez votre besoin en au moins 20 caractères.")
    .max(5000, "La description est trop longue."),
  budget: z.string().trim().max(100).optional().default(""),
  deadline: z.string().trim().max(100).optional().default(""),
});

export type LeadFormValues = z.input<typeof leadSchema>;
