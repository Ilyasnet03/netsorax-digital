"use client";

import { ArrowRight, Check, LoaderCircle, Send } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import {
  leadSchema,
  leadServices,
  leadServiceLabels,
  type LeadFormValues,
} from "@/lib/lead-schema";

type ProjectValues = Omit<LeadFormValues, "service"> & {
  service: LeadFormValues["service"] | "";
};

const initialValues: ProjectValues = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  description: "",
  budget: "",
  deadline: "",
};

export function ProjectForm() {
  const [values, setValues] = useState<ProjectValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const errors = useMemo(() => {
    const result = leadSchema.safeParse(values);
    return result.success ? {} : result.error.flatten().fieldErrors;
  }, [values]);

  function updateField<K extends keyof ProjectValues>(
    field: K,
    value: LeadFormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setServerError("");
  }

  function markTouched(field: keyof ProjectValues) {
    setTouched((current) => new Set(current).add(field));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setSuccess(false);
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) return;

    setIsSending(true);
    setServerError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (!response.ok) {
        setServerError(result.message ?? "Une erreur est survenue. Réessayez.");
        return;
      }
      setSuccess(true);
      setValues(initialValues);
      setSubmitted(false);
    } catch {
      setServerError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    } finally {
      setIsSending(false);
    }
  }

  const fieldError = (field: keyof ProjectValues) => {
    if (!submitted && !touched.has(field)) return null;
    const message = errors[field]?.[0];
    return message ? <span className="field-error">{message}</span> : null;
  };
  const hasError = (field: keyof ProjectValues) =>
    (submitted || touched.has(field)) && Boolean(errors[field]?.length);

  return (
    <form className="project-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label className="form-field">
          <span>Prénom <i>*</i></span>
          <input autoComplete="given-name" value={values.firstName} onChange={(e) => updateField("firstName", e.target.value)} onBlur={() => markTouched("firstName")} aria-invalid={hasError("firstName")} placeholder="Camille" />
          {fieldError("firstName")}
        </label>
        <label className="form-field">
          <span>Nom <i>*</i></span>
          <input autoComplete="family-name" value={values.lastName} onChange={(e) => updateField("lastName", e.target.value)} onBlur={() => markTouched("lastName")} aria-invalid={hasError("lastName")} placeholder="Martin" />
          {fieldError("lastName")}
        </label>
        <label className="form-field">
          <span>Entreprise <small>Facultatif</small></span>
          <input autoComplete="organization" value={values.company} onChange={(e) => updateField("company", e.target.value)} onBlur={() => markTouched("company")} placeholder="Nom de votre entreprise" />
        </label>
        <label className="form-field">
          <span>E-mail <i>*</i></span>
          <input type="email" autoComplete="email" value={values.email} onChange={(e) => updateField("email", e.target.value)} onBlur={() => markTouched("email")} aria-invalid={hasError("email")} placeholder="vous@exemple.fr" />
          {fieldError("email")}
        </label>
        <label className="form-field">
          <span>Téléphone <small>Facultatif</small></span>
          <input type="tel" autoComplete="tel" value={values.phone} onChange={(e) => updateField("phone", e.target.value)} onBlur={() => markTouched("phone")} placeholder="+33 6 12 34 56 78" />
        </label>
        <label className="form-field">
          <span>Budget estimé en dirhams (MAD) <small>Facultatif</small></span>
          <input
            type="text"
            inputMode="decimal"
            value={values.budget}
            onChange={(e) => updateField("budget", e.target.value)}
            onBlur={() => markTouched("budget")}
            placeholder="Saisissez votre budget en dirhams"
          />
        </label>
      </div>

      <fieldset className="service-picker">
        <legend>Quel est votre besoin ? <i>*</i></legend>
        <div className="service-options">
          {leadServices.map((service) => (
            <button
              className={`service-option${values.service === service ? " selected" : ""}`}
              key={service}
              type="button"
              aria-pressed={values.service === service}
              onClick={() => { updateField("service", service); markTouched("service"); }}
            >
              {values.service === service && <Check size={14} />}
              {leadServiceLabels[service]}
            </button>
          ))}
        </div>
        {fieldError("service")}
      </fieldset>

      <div className="form-grid form-grid-bottom">
        <label className="form-field form-field-wide">
          <span>Parlez-nous de votre projet <i>*</i></span>
          <textarea
            rows={4}
            value={values.description}
            onChange={(e) => updateField("description", e.target.value)}
            onBlur={() => markTouched("description")}
            aria-invalid={hasError("description")}
            placeholder="Votre idée, vos objectifs, les fonctionnalités souhaitées…"
          />
          {fieldError("description")}
        </label>
        <label className="form-field">
          <span>Délai souhaité <small>Facultatif</small></span>
          <select value={values.deadline} onChange={(e) => updateField("deadline", e.target.value)} onBlur={() => markTouched("deadline")}>
            <option value="">Sans préférence</option>
            <option value="Dès que possible">Dès que possible</option>
            <option value="Dans le mois">Dans le mois</option>
            <option value="Dans les 3 mois">Dans les 3 mois</option>
            <option value="Plus tard / à discuter">Plus tard / à discuter</option>
          </select>
        </label>
      </div>

      {serverError && <p className="form-alert" role="alert">{serverError}</p>}
      {success && (
        <p className="form-success" role="status">
          <span className="success-icon"><Check size={16} /></span>
          Merci pour votre confiance. Votre demande a bien été envoyée.
        </p>
      )}
      <div className="form-submit-row">
        <p>Les champs marqués d’un * sont obligatoires.</p>
        <button className="button button-primary form-submit" type="submit" disabled={isSending}>
          {isSending ? <LoaderCircle className="spin" size={17} /> : <Send size={16} />}
          {isSending ? "Envoi en cours…" : "Envoyer ma demande"}
          {!isSending && <ArrowRight size={16} />}
        </button>
      </div>
    </form>
  );
}
