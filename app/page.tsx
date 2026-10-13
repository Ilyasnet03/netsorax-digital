import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Cpu,
  Layers3,
  MoveUpRight,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { ProjectForm } from "@/components/project-form";
import { Reveal } from "@/components/reveal";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Sites web & expériences digitales",
    description:
      "Des interfaces rapides, accessibles et pensées pour convertir — du site vitrine à la plateforme web complète.",
    tags: ["Next.js", "React", "Tailwind"],
    className: "service-card service-card-web",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Logiciels sur mesure",
    description:
      "Des outils métier qui s’adaptent à votre façon de travailler, pas l’inverse. Web, desktop ou mobile.",
    tags: ["Applications", "API", "Cloud"],
    className: "service-card service-card-software",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Intelligence artificielle",
    description:
      "Transformez vos données en avantage : modèles prédictifs, IA générative et vision par ordinateur.",
    tags: ["Machine learning", "LLM", "Vision"],
    className: "service-card service-card-ai",
  },
  {
    number: "04",
    icon: Workflow,
    title: "Conseil & architecture",
    description:
      "Les bonnes décisions techniques pour construire une base fiable, évolutive et prête pour la suite.",
    tags: ["Architecture", "Audit", "Stratégie"],
    className: "service-card service-card-consulting",
  },
];

const projects = [
  {
    index: "01",
    category: "PLATEFORME SAAS",
    title: "Orbit — gestion de projet",
    description: "Un espace de travail intelligent pour des équipes qui avancent vite.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    className: "project-art project-art-orbit",
    visual: "orbit-visual",
  },
  {
    index: "02",
    category: "INTELLIGENCE ARTIFICIELLE",
    title: "Clair — analyse documentaire",
    description: "L’IA qui extrait l’essentiel de milliers de documents en quelques secondes.",
    technologies: ["Python", "LLM", "Azure"],
    className: "project-art project-art-clair",
    visual: "clair-visual",
  },
  {
    index: "03",
    category: "E-COMMERCE",
    title: "Maison Aube — commerce responsable",
    description: "Une boutique digitale immersive conçue pour une nouvelle génération de marques.",
    technologies: ["React", "Shopify", "Motion"],
    className: "project-art project-art-aube",
    visual: "aube-visual",
  },
];

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <section className="hero section-shell">
          <div className="hero-copy">
            <Reveal>
              <div className="eyebrow"><span className="status-dot" /> STUDIO D’INGÉNIERIE NUMÉRIQUE</div>
              <h1>
                Le futur ne se<br />
                <span className="gradient-text">code pas tout seul.</span>
              </h1>
              <p className="hero-description">
                Nous imaginons et développons des produits numériques qui font
                avancer votre activité. Web, logiciel et intelligence artificielle.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Démarrer un projet <ArrowUpRight size={17} />
                </a>
                <a className="button button-secondary" href="#expertises">
                  Explorer nos services <ArrowDown size={15} />
                </a>
              </div>
              <div className="hero-proof">
                <div className="avatar-stack" aria-hidden="true">
                  <span>✳</span><span>◈</span><span>✦</span>
                </div>
                <p><strong>Du premier croquis au produit lancé.</strong><br />Un partenaire technique à vos côtés.</p>
              </div>
            </Reveal>
          </div>
          <Reveal className="hero-visual-wrap" delay={0.14}>
            <div className="hero-visual">
              <div className="hero-visual-orbit orbit-one" />
              <div className="hero-visual-orbit orbit-two" />
              <div className="hero-core"><Braces size={49} strokeWidth={1.2} /></div>
              <span className="orbit-node node-web"><Code2 size={18} /><small>WEB</small></span>
              <span className="orbit-node node-ai"><Sparkles size={18} /><small>IA</small></span>
              <span className="orbit-node node-data"><Workflow size={18} /><small>DATA</small></span>
              <span className="visual-label">DES IDÉES, EN MOUVEMENT<span>✳</span></span>
              <div className="visual-glass-card">
                <span className="glass-icon"><Check size={15} /></span>
                <span><strong>Conçu pour durer</strong><small>Technologie. Avec intention.</small></span>
                <span className="glass-sparkle">✦</span>
              </div>
            </div>
          </Reveal>
          <div className="hero-bottomline">
            <span>INGÉNIERIE · CRÉATIVITÉ · IMPACT</span>
            <span>INDÉPENDANT, COLLABORATIF, ENGAGÉ <ArrowDown size={13} /></span>
          </div>
        </section>

        <section className="services-section section-shell" id="expertises">
          <Reveal className="section-heading">
            <div>
              <span className="section-kicker">CE QUE NOUS FAISONS</span>
              <h2>La technologie,<br /><span className="muted-heading">au service des idées.</span></h2>
            </div>
            <p>Une expertise technique exigeante, alliée à une vraie compréhension de vos enjeux métier.</p>
          </Reveal>
          <div className="services-grid">
            {services.map(({ number, icon: Icon, title, description, tags, className }, index) => (
              <Reveal key={number} delay={index * 0.07} className={className}>
                <div className="service-card-top">
                  <span className="service-icon"><Icon size={20} strokeWidth={1.6} /></span>
                  <span className="service-number">{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="tag-row">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <MoveUpRight className="service-arrow" size={18} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="portfolio-section section-shell" id="projets">
          <Reveal className="section-heading portfolio-heading">
            <div>
              <span className="section-kicker">SÉLECTION DE PROJETS</span>
              <h2>Du concret.<br /><span className="muted-heading">Du significatif.</span></h2>
            </div>
            <p>Quelques exemples de ce qui devient possible lorsque la bonne idée rencontre la bonne équipe.</p>
          </Reveal>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <Reveal key={project.index} delay={index * 0.08} className="project-card">
                <div className={project.className}>
                  {project.visual === "orbit-visual" && (
                    <div className="orbit-board">
                      <div className="orbit-board-top"><span>◉ Orbit</span><span>•••</span></div>
                      <div className="orbit-board-title">Vue d’ensemble <span>Cette semaine⌄</span></div>
                      <div className="orbit-metrics"><div><small>Projets actifs</small><b>08</b><i>+2 ce mois</i></div><div><small>Progression</small><b>72%</b><i>En bonne voie</i></div></div>
                      <div className="orbit-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                      <div className="orbit-board-footer"><span>◉ Design system</span><span>◉ Déploiement</span><span>◉ Recherche</span></div>
                    </div>
                  )}
                  {project.visual === "clair-visual" && (
                    <div className="clair-window">
                      <div className="clair-top"><span>✳ clair</span><span>Assistant documentaire</span><span>•••</span></div>
                      <div className="clair-content"><div className="doc-icon">PDF</div><div><small>RAPPORT ANNUEL · 2025</small><b>Analyse terminée</b><span>Résumé généré en 4,2 secondes</span></div></div>
                      <div className="clair-summary"><span>✦</span><div><b>En quelques mots</b><p>La croissance progresse de 18 % cette année, portée par l’innovation produit et une présence renforcée à l’international.</p></div></div>
                      <div className="clair-lines"><i /><i /><i /></div>
                    </div>
                  )}
                  {project.visual === "aube-visual" && (
                    <div className="aube-window">
                      <div className="aube-nav"><span>maison aube</span><span>Collections　 À propos　 ◯</span></div>
                      <div className="aube-art"><div className="aube-sun" /><div className="aube-vase vase-one" /><div className="aube-vase vase-two" /><div className="aube-branch">✳</div><span>OBJETS POUR DEMAIN</span></div>
                      <div className="aube-caption">L’essentiel, naturellement. <span>↗</span></div>
                    </div>
                  )}
                  <span className="project-index">{project.index}</span>
                  <span className="project-open"><ArrowUpRight size={18} /></span>
                </div>
                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="portfolio-note">Projets de démonstration — remplacez-les par vos réalisations.</p>
        </section>

        <section className="about-section section-shell" id="apropos">
          <Reveal className="about-card">
            <div className="about-symbol" aria-hidden="true">
              <div className="about-orb orb-a" /><div className="about-orb orb-b" />
              <div className="about-cross">✳</div><span>LA CURIOSITÉ<br />COMME MOTEUR</span>
            </div>
            <div className="about-copy">
              <span className="section-kicker">UN STUDIO, UNE CONVICTION</span>
              <h2>La rigueur d’un ingénieur.<br /><span className="muted-heading">L’élan d’un créateur.</span></h2>
              <p>Netsorax est un studio indépendant né d’une conviction simple : la meilleure technologie est celle qui rend les choses possibles. Nous associons ingénierie logicielle, curiosité et sens du détail pour transformer des défis complexes en solutions utiles.</p>
              <div className="about-values">
                <span><Check size={14} /> Écoute & transparence</span>
                <span><Check size={14} /> Excellence technique</span>
                <span><Check size={14} /> Impact durable</span>
              </div>
              <a className="text-link" href="#contact">Et si on faisait équipe ? <ArrowRight size={15} /></a>
            </div>
          </Reveal>
        </section>

        <section className="contact-section section-shell" id="contact">
          <Reveal className="contact-heading">
            <span className="section-kicker">VOTRE PROCHAINE ÉTAPE</span>
            <h2>Une idée en tête ?<br /><span className="gradient-text">Faisons-la exister.</span></h2>
            <p>Parlez-nous de votre projet. Nous revenons vers vous sous 48 heures ouvrées.</p>
          </Reveal>
          <Reveal className="contact-card" delay={0.1}>
            <div className="form-intro">
              <span className="form-step">01 <i>—</i> PARLONS DE VOTRE PROJET</span>
              <h3>Commençons par<br />faire connaissance.</h3>
              <p>Quelques détails suffisent pour engager la conversation. Pas besoin d’avoir toutes les réponses dès maintenant.</p>
              <div className="contact-aside-note"><span className="status-dot" /> Réponse sous 48h ouvrées</div>
            </div>
            <ProjectForm />
          </Reveal>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <a className="wordmark" href="#" aria-label="Netsorax, haut de page"><span className="brand-mark">N</span><span>Netsorax<span className="brand-dot">.</span></span></a>
        <p>La technologie au service des idées.</p>
        <div className="footer-links"><a href="#expertises">Expertises</a><a href="#projets">Projets</a><a href="#contact">Contact</a><a href="/admin/login">Espace admin</a></div>
        <span className="copyright">© {new Date().getFullYear()} NETSORAX. FAIT AVEC INTENTION.</span>
      </footer>
    </>
  );
}
