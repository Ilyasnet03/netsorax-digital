import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  Inbox,
  Mail,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteLead, logoutAction, toggleLeadRead, updateLead } from "./actions";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getLeadServiceLabel,
  getLeadStatusLabel,
  isLeadService,
  isLeadStatus,
  leadServiceLabels,
  leadServices,
  leadStatusLabels,
  leadStatuses,
} from "@/lib/lead-schema";

export const metadata = {
  title: "Tableau de bord — Netsorax",
  robots: { index: false, follow: false },
};

type AdminPageProps = {
  searchParams: Promise<{ service?: string; status?: string }>;
};

const statusClass = {
  NEW: "status-new",
  IN_PROGRESS: "status-progress",
  COMPLETED: "status-completed",
};

function getStatusClass(value: string) {
  if (!isLeadStatus(value)) throw new Error(`Unknown lead status: ${value}`);
  return statusClass[value];
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  const filters = await searchParams;
  const serviceFilter = filters.service && isLeadService(filters.service) ? filters.service : undefined;
  const statusFilter = filters.status && isLeadStatus(filters.status) ? filters.status : undefined;
  const [leads, total, unread, serviceCounts, inProgress, completed] = await Promise.all([
    prisma.lead.findMany({
      where: {
        ...(serviceFilter ? { service: serviceFilter } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.lead.count(),
    prisma.lead.count({ where: { readAt: null } }),
    prisma.lead.groupBy({ by: ["service"], _count: { _all: true } }),
    prisma.lead.count({ where: { status: "IN_PROGRESS" } }),
    prisma.lead.count({ where: { status: "COMPLETED" } }),
  ]);
  const countByService = new Map(serviceCounts.map((entry) => [entry.service, entry._count._all]));
  const maxServiceCount = Math.max(1, ...serviceCounts.map((entry) => entry._count._all));

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <Link className="wordmark" href="/"><span className="brand-mark">N</span><span>Netsorax<span className="brand-dot">.</span></span></Link>
        <div className="admin-topbar-right">
          <span className="admin-user"><span className="admin-avatar">{session.email.charAt(0).toUpperCase()}</span>{session.email}</span>
          <form action={logoutAction}><button className="logout-button" type="submit">Déconnexion <ArrowUpRight size={14} /></button></form>
        </div>
      </header>

      <div className="admin-content">
        <Link className="back-link admin-back" href="/"><ArrowLeft size={14} /> Retour au site</Link>
        <div className="dashboard-heading">
          <div><span className="section-kicker">VOTRE ESPACE DE PILOTAGE</span><h1>Tableau de bord<span className="brand-dot">.</span></h1><p>Suivez vos demandes et gardez le fil de chaque projet.</p></div>
          <span className="dashboard-date"><Clock3 size={14} /> Mis à jour en temps réel</span>
        </div>

        <div className="stat-grid">
          <article className="stat-card"><span className="stat-icon stat-icon-violet"><Inbox size={18} /></span><span className="stat-label">Demandes reçues</span><strong>{total}</strong><small>Total depuis le lancement</small></article>
          <article className="stat-card"><span className="stat-icon stat-icon-blue"><Mail size={18} /></span><span className="stat-label">À consulter</span><strong>{unread}</strong><small>{unread ? "Demandes non lues" : "Tout est à jour"}</small></article>
          <article className="stat-card"><span className="stat-icon stat-icon-green"><BriefcaseBusiness size={18} /></span><span className="stat-label">Projets en cours</span><strong>{inProgress}</strong><small>Demandes en traitement</small></article>
          <article className="stat-card"><span className="stat-icon stat-icon-orange"><Users size={18} /></span><span className="stat-label">Terminés</span><strong>{completed}</strong><small>Devis envoyés / traités</small></article>
        </div>

        <section className="service-stats panel">
          <div className="panel-heading"><div><span className="section-kicker">VUE D’ENSEMBLE</span><h2>Demandes par expertise</h2></div><span className="panel-count">{total} au total</span></div>
          <div className="service-stat-list">
            {leadServices.map((service) => {
              const count = countByService.get(service) ?? 0;
              return <div className="service-stat-row" key={service}><span>{leadServiceLabels[service]}</span><div className="stat-track"><i style={{ width: `${(count / maxServiceCount) * 100}%` }} /></div><strong>{count}</strong></div>;
            })}
          </div>
        </section>

        <section className="leads-panel panel">
          <div className="panel-heading leads-heading">
            <div><span className="section-kicker">VOTRE PIPELINE</span><h2>Demandes de projet</h2></div>
            <span className="panel-count">{leads.length} affichée{leads.length > 1 ? "s" : ""}</span>
          </div>
          <form className="lead-filters" action="/admin">
            <label><span>Service</span><select name="service" defaultValue={serviceFilter ?? ""}><option value="">Tous les services</option>{leadServices.map((service) => <option key={service} value={service}>{leadServiceLabels[service]}</option>)}</select></label>
            <label><span>Statut</span><select name="status" defaultValue={statusFilter ?? ""}><option value="">Tous les statuts</option>{leadStatuses.map((status) => <option key={status} value={status}>{leadStatusLabels[status]}</option>)}</select></label>
            <button className="filter-button" type="submit">Filtrer <ArrowDownToLine size={14} /></button>
          </form>

          {leads.length === 0 ? (
            <div className="admin-empty"><span><Inbox size={24} /></span><h3>{total === 0 ? "Votre boîte de réception est prête." : "Aucune demande pour ces filtres."}</h3><p>{total === 0 ? "Les nouvelles demandes envoyées depuis le site apparaîtront ici." : "Modifiez vos filtres pour afficher d’autres demandes."}</p></div>
          ) : (
            <div className="lead-list">
              {leads.map((lead) => (
                <details className={`lead-item${lead.readAt ? "" : " lead-unread"}`} key={lead.id}>
                  <summary>
                    <span className={`lead-initial${lead.readAt ? "" : " initial-unread"}`}>{lead.firstName.charAt(0)}{lead.lastName.charAt(0)}</span>
                    <span className="lead-person"><strong>{lead.firstName} {lead.lastName}</strong><small>{lead.company || lead.email}</small></span>
                    <span className="lead-service-label">{getLeadServiceLabel(lead.service)}</span>
                    <span className={`lead-status ${getStatusClass(lead.status)}`}>{getLeadStatusLabel(lead.status)}</span>
                    <time dateTime={lead.createdAt.toISOString()}>{new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(lead.createdAt)}</time>
                    <span className="lead-chevron"><ArrowDownToLine size={15} /></span>
                  </summary>
                  <div className="lead-details">
                    <div className="lead-contact-line"><a href={`mailto:${lead.email}`}><Mail size={14} />{lead.email}</a>{lead.phone && <a href={`tel:${lead.phone}`}><span>☎</span>{lead.phone}</a>}<span>Reçu le {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" }).format(lead.createdAt)}</span></div>
                    <p className="lead-description">{lead.description}</p>
                    <div className="lead-meta">{lead.budget && <span><small>BUDGET</small>{lead.budget}</span>}{lead.deadline && <span><small>DÉLAI</small>{lead.deadline}</span>}{lead.company && <span><small>ENTREPRISE</small>{lead.company}</span>}</div>
                    <div className="lead-actions">
                      <form action={updateLead} className="lead-status-form">
                        <input type="hidden" name="id" value={lead.id} />
                        <label className="sr-only" htmlFor={`status-${lead.id}`}>Modifier le statut de la demande de {lead.firstName} {lead.lastName}</label>
                        <select id={`status-${lead.id}`} name="status" defaultValue={lead.status}>{leadStatuses.map((status) => <option key={status} value={status}>{leadStatusLabels[status]}</option>)}</select>
                        <button className="small-action-button" type="submit">Enregistrer</button>
                      </form>
                      <form action={toggleLeadRead}>
                        <input type="hidden" name="id" value={lead.id} /><input type="hidden" name="isRead" value={String(Boolean(lead.readAt))} />
                        <button className="small-action-button" type="submit">{lead.readAt ? "Marquer comme non lue" : "Marquer comme lue"}</button>
                      </form>
                      <form action={deleteLead}>
                        <input type="hidden" name="id" value={lead.id} />
                        <button className="small-action-button delete-action" type="submit"><Trash2 size={14} /> Supprimer</button>
                      </form>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          )}
        </section>
        <footer className="admin-footer">NETSORAX · VOS PROJETS, EN UN SEUL ENDROIT <Link href="/">Retour au site <ArrowUpRight size={13} /></Link></footer>
      </div>
    </main>
  );
}
