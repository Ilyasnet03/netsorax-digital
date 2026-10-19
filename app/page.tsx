import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Cpu,
  Layers3,
  Mail,
  MoveUpRight,
  Phone,
  Workflow,
} from "lucide-react";
import { AmbientGlow } from "@/components/ambient-glow";
import { Navigation } from "@/components/navigation";
import { ProjectForm } from "@/components/project-form";
import { Playground } from "@/components/playground";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton } from "@/components/whatsapp-button";

const contactPhone = "+212 6 25 96 39 77";
const contactPhoneHref = "tel:+212625963977";
const supportEmail = "productownerchip@gmail.com";

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
    category: "ASSURANCE · GESTION D’EXPERTISE",
    title: "SI Expert — Wafa Assurance",
    description: "Application de gestion des missions d’expertise automobile, avec des espaces dédiés aux experts et aux administrateurs.",
    technologies: ["React", "Spring Boot", "Keycloak"],
    repository: "https://github.com/Ilyasnet03/si-expert2",
    mark: "SI",
    product: "Suivi des missions d’expertise",
    features: ["Affectation et suivi des missions", "Gestion des devis et expertises", "Accès par rôles : expert et admin"],
    className: "project-art project-art-insurance",
  },
  {
    index: "02",
    category: "VISION PAR ORDINATEUR",
    title: "Détection du port du casque",
    description: "Prototype de classification d’images pour distinguer le port du casque de sécurité de son absence.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Gradio"],
    repository: "https://github.com/Ilyasnet03/detecteur-de-port-du-casque",
    mark: "CV",
    product: "Analyse d’image",
    features: ["Classification par CNN", "Casque détecté / absent", "Interface de test Gradio"],
    className: "project-art project-art-vision",
  },
  {
    index: "03",
    category: "RESSOURCES HUMAINES · MACHINE LEARNING",
    title: "Prédiction des départs en entreprise",
    description: "Outil d’analyse exploratoire qui estime le risque de départ et met en évidence les facteurs associés.",
    technologies: ["Python", "Random Forest", "Gradio"],
    repository: "https://github.com/Ilyasnet03/predir-la-demission-d-un-employe",
    mark: "RH",
    product: "Analyse prédictive RH",
    features: ["Analyse de profils employés", "Facteurs d’influence visualisés", "Interface interactive Gradio"],
    className: "project-art project-art-people",
  },
  {
    index: "04",
    category: "RECRUTEMENT · INTELLIGENCE ARTIFICIELLE",
    title: "Matching IA de candidatures",
    description: "Concept de plateforme pour rapprocher des profils candidats des compétences recherchées dans une offre.",
    technologies: ["PHP", "IA", "Recrutement"],
    repository: "https://github.com/Ilyasnet03/recrutement-avec-matching-Ai",
    mark: "IA",
    product: "Matching de profils",
    features: ["Création de fiches de poste", "Ajout de CV candidats", "Recherche de profils adaptés"],
    className: "project-art project-art-recruitment",
  },
  {
    index: "05",
    category: "APPLICATION MOBILE",
    title: "Application météo",
    description: "Projet Flutter de prévision météo avec interfaces documentées dans le dépôt.",
    technologies: ["Flutter", "Dart"],
    repository: "https://github.com/Ilyasnet03/app_weather",
    mark: "°",
    product: "Météo au quotidien",
    features: ["Application mobile Flutter", "Interface météo", "Projet disponible sur GitHub"],
    className: "project-art project-art-weather",
  },
];

export default function Home() {
  return (
    <>
      <Navigation />
      <WhatsAppButton />
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
                Du cadrage au déploiement, nous concevons les outils numériques
                qui résolvent de vrais problèmes — avec exigence, clarté et sens du détail.
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
                <span className="proof-mark"><Check size={15} /></span>
                <p><strong>Un interlocuteur technique, du début à la fin.</strong><br />Des choix expliqués. Un produit conçu pour durer.</p>
              </div>
            </Reveal>
          </div>
          <Reveal className="hero-visual-wrap" delay={0.14}>
            <AmbientGlow className="hero-visual">
              <div className="hero-editor" aria-label="Extrait de code illustratif">
                <div className="editor-topbar">
                  <span className="editor-window-dots"><i /><i /><i /></span>
                  <span>product.tsx</span>
                  <span className="editor-language">TSX</span>
                </div>
                <div className="editor-code" aria-hidden="true">
                  <span><i>01</i><b className="code-purple">export</b> <b className="code-blue">function</b> <b className="code-yellow">Product</b>() {"{"}</span>
                  <span><i>02</i>  <b className="code-purple">return</b> (</span>
                  <span><i>03</i>    &lt;<b className="code-blue">Experience</b></span>
                  <span><i>04</i>      quality=<b className="code-green">"crafted"</b></span>
                  <span><i>05</i>      purpose=<b className="code-green">"yours"</b></span>
                  <span><i>06</i>    /&gt;</span>
                  <span><i>07</i>  )</span>
                  <span><i>08</i>{"}"}</span>
                </div>
                <div className="editor-footer">
                  <span><span className="status-dot" /> Prêt à évoluer</span>
                  <span>WEB · LOGICIEL · IA</span>
                </div>
              </div>
              <div className="visual-glass-card">
                <span className="glass-icon"><Check size={15} /></span>
                <span><strong>Conçu avec intention</strong><small>Du besoin à la mise en ligne.</small></span>
                <span className="glass-sparkle">✦</span>
              </div>
            </AmbientGlow>
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

        <section className="process-section section-shell" id="methode">
          <Reveal className="process-heading">
            <span className="section-kicker">UNE MÉTHODE, PAS DE RECETTE</span>
            <h2>Le bon problème.<br /><span className="muted-heading">La bonne solution.</span></h2>
            <p>Chaque projet commence par comprendre votre contexte. La technologie vient ensuite.</p>
          </Reveal>
          <div className="process-grid">
            {[
              { number: "01", title: "Comprendre", description: "On clarifie vos objectifs, vos contraintes et ce qui ferait réellement la différence." },
              { number: "02", title: "Concevoir", description: "On choisit une approche proportionnée, on dessine l’expérience et on valide les priorités." },
              { number: "03", title: "Construire", description: "On développe, on teste et on vous accompagne jusqu’à la mise en ligne." },
            ].map((step, index) => (
              <Reveal key={step.number} className="process-step" delay={index * 0.08}>
                <span className="process-number">{step.number}<ArrowUpRight size={15} /></span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <Playground />

        <section className="portfolio-section section-shell" id="projets">
          <Reveal className="section-heading portfolio-heading">
            <div>
              <span className="section-kicker">SÉLECTION DE PROJETS</span>
              <h2>Du concret.<br /><span className="muted-heading">Du significatif.</span></h2>
            </div>
            <p>Quelques exemples de ce qui devient possible lorsque la bonne idée rencontre la bonne équipe.</p>
          </Reveal>
          <div className="projects-grid">
            {projects.map((project) => (
              <Reveal key={project.index} className="project-card">
                <div className={project.className}>
                  <div className="project-showcase">
                    <div className="showcase-topline"><span className="showcase-mark">{project.mark}</span><span className="showcase-label">{project.category}</span></div>
                    <h4>{project.product}</h4>
                    <ul>{project.features.map((feature) => <li key={feature}><Check size={13} />{feature}</li>)}</ul>
                    <div className="showcase-stack">{project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div>
                  </div>
                  <span className="project-index">{project.index}</span>
                  <a className="project-open" href={project.repository} target="_blank" rel="noreferrer" aria-label={`Voir ${project.title} sur GitHub`}>
                    <ArrowUpRight size={18} />
                  </a>
                </div>
                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                  <a className="project-repository-link" href={project.repository} target="_blank" rel="noreferrer">Voir le dépôt sur GitHub <ArrowUpRight size={13} /></a>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="portfolio-note">Projets issus de dépôts GitHub publics. SI Expert est présenté comme un projet technique ; cela ne constitue pas une recommandation officielle de Wafa Assurance.</p>
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
              <a className="contact-phone" href={contactPhoneHref} aria-label={`Appeler le ${contactPhone}`}>
                <Phone size={14} /> {contactPhone}
              </a>
              <a className="contact-phone" href={`mailto:${supportEmail}`}>
                <Mail size={14} /> {supportEmail}
              </a>
            </div>
            <ProjectForm />
          </Reveal>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <a className="wordmark" href="#" aria-label="Netsorax, haut de page"><span className="brand-mark">N</span><span>Netsorax<span className="brand-dot">.</span></span></a>
        <p>La technologie au service des idées.</p>
        <div className="footer-links"><a href="#expertises">Expertises</a><a href="#projets">Projets</a><a href="#contact">Contact</a><a href={contactPhoneHref} aria-label={`Appeler le ${contactPhone}`}>{contactPhone}</a><a href={`mailto:${supportEmail}`}>{supportEmail}</a><a href="/admin/login">Espace admin</a></div>
        <span className="copyright">© {new Date().getFullYear()} NETSORAX. FAIT AVEC INTENTION.</span>
      </footer>
    </>
  );
}
