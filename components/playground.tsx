"use client";

import { useState } from "react";

const examples = [
  {
    id: "vision",
    label: "Vision · Python",
    lines: [
      [{ text: "def ", className: "code-keyword" }, { text: "analyser_image(image):" }],
      [{ text: "    resultat = modele.predict(image)" }],
      [{ text: "    return ", className: "code-keyword" }, { text: "{" }],
      [{ text: '        "classe": resultat.label,' }],
      [{ text: '        "confiance": resultat.score' }],
      [{ text: "    }" }],
    ],
  },
  {
    id: "mobile",
    label: "Mobile · Flutter",
    lines: [
      [{ text: "class ", className: "code-keyword" }, { text: "ActionButton extends StatelessWidget {" }],
      [{ text: "  const ActionButton({super.key});" }],
      [{ text: "  @override" }],
      [{ text: "  Widget build(context) => FilledButton(" }],
      [{ text: "    onPressed: onTap," }],
      [{ text: '    child: const Text("Explorer"),' }],
      [{ text: "  );" }],
      [{ text: "}" }],
    ],
  },
  {
    id: "cloud",
    label: "API · Spring",
    lines: [
      [{ text: "@RestController", className: "code-decorator" }],
      [{ text: "class ", className: "code-keyword" }, { text: "HealthController {" }],
      [{ text: "  @GetMapping(", className: "code-decorator" }, { text: '"/health")' }],
      [{ text: "  Map<String, String> status() {" }],
      [{ text: '    return Map.of("status", "ready");', className: "code-string" }],
      [{ text: "  }" }],
      [{ text: "}" }],
    ],
  },
] as const;

export function Playground() {
  const [activeExample, setActiveExample] = useState(0);
  const [helmetDetected, setHelmetDetected] = useState(true);
  const example = examples[activeExample];

  return (
    <section className="lab-section section-shell" id="lab">
      <div className="section-heading lab-heading">
        <div>
          <span className="section-kicker">LAB TECHNIQUE · À VOUS DE JOUER</span>
          <h2>Quelques lignes.<br /><span className="muted-heading">Une idée qui prend vie.</span></h2>
        </div>
        <p>Un aperçu interactif des univers explorés : vision par ordinateur, mobile et API cloud.</p>
      </div>

      <div className="lab-grid">
        <div className="code-panel">
          <div className="code-panel-top">
            <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
            <span>exemple.{example.id === "vision" ? "py" : example.id === "mobile" ? "dart" : "java"}</span>
            <span className="code-panel-status"><span className="status-dot" /> exemple</span>
          </div>
          <div className="lab-tabs" role="tablist" aria-label="Exemples de code">
            {examples.map((item, index) => (
              <button
                key={item.id}
                id={`lab-tab-${item.id}`}
                className={activeExample === index ? "lab-tab is-active" : "lab-tab"}
                type="button"
                role="tab"
                aria-selected={activeExample === index}
                aria-controls="lab-code"
                onClick={() => setActiveExample(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="code-content" id="lab-code" role="tabpanel" aria-labelledby={`lab-tab-${example.id}`}>
            <pre aria-label={`Extrait illustratif ${example.label}`}><code>
              {example.lines.map((line, index) => (
                <span className="code-line" key={`${example.id}-${index}`}>
                  <span className="code-line-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span>{line.map((part, partIndex) => (
                    <span className={"className" in part ? part.className : undefined} key={`${index}-${partIndex}`}>{part.text}</span>
                  ))}</span>
                </span>
              ))}
            </code></pre>
          </div>
          <p className="code-caption">Extraits illustratifs inspirés des technologies des projets présentés.</p>
        </div>

        <div className="lab-demo">
          <div className="demo-topline"><span className="demo-icon">✳</span><span>MINI DÉMO · VISION</span><span className="demo-live"><i /> interactif</span></div>
          <h3>Et si on testait ?</h3>
          <p className="demo-description">Changez l’entrée pour voir comment une interface pourrait présenter un résultat.</p>
          <div className="demo-choice-group" role="group" aria-label="Choisir une entrée de simulation">
            <button type="button" className={helmetDetected ? "demo-choice is-selected" : "demo-choice"} aria-pressed={helmetDetected} onClick={() => setHelmetDetected(true)}>
              Casque visible
            </button>
            <button type="button" className={!helmetDetected ? "demo-choice is-selected" : "demo-choice"} aria-pressed={!helmetDetected} onClick={() => setHelmetDetected(false)}>
              Sans casque
            </button>
          </div>
          <div className="demo-result" aria-live="polite">
            <span className="demo-result-icon">{helmetDetected ? "✓" : "!"}</span>
            <span><small>RÉSULTAT SIMULÉ</small><strong>{helmetDetected ? "Casque détecté" : "Casque non détecté"}</strong></span>
            <span className="demo-confidence">{helmetDetected ? "98" : "91"}%</span>
          </div>
          <p className="demo-disclaimer">Simulation d’interface uniquement — aucune image ni aucun modèle IA n’est exécuté.</p>
        </div>
      </div>
    </section>
  );
}
