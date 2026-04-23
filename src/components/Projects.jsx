import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { defaultProjects } from "../data/portfolio-data";
import { useInView } from "../hooks/useInView";
import "./Projects.css";

// Icono de enlace externo
const ExternalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// Icono de GitHub
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Card individual de proyecto
function ProjectCard({ project, index }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <article
      ref={ref}
      className={`project-card animate ${isInView ? "visible" : ""}`}
      style={{
        transitionDelay: `${(index % 2) * 0.12}s`,
        "--project-color": project.color,
      }}
    >
      {/* Header: icono + badge coming soon */}
      <div className="project-card__header">
        <span className="project-card__icon">{project.icon}</span>
        {project.comingSoon && (
          <span className="badge badge-warning project-card__soon">
            🚧 Próximamente
          </span>
        )}
      </div>

      {/* Título y subtítulo */}
      <h3 className="project-card__name">{project.name}</h3>
      <p className="project-card__subtitle">{project.subtitle}</p>

      {/* Descripción */}
      <p className="project-card__desc">{project.description}</p>

      {/* Stack como pills */}
      <div className="project-card__stack">
        {project.stack.map((tech) => (
          <span key={tech} className="project-card__tech">
            {tech}
          </span>
        ))}
      </div>

      {/* Botones de acción */}
      <div className="project-card__actions">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__btn"
            aria-label={`Ver demo de ${project.name}`}
          >
            Demo <ExternalIcon />
          </a>
        ) : (
          <span className="project-card__btn project-card__btn--disabled">
            Demo <ExternalIcon />
          </span>
        )}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__btn"
            aria-label={`Código de ${project.name} en GitHub`}
          >
            <GitHubIcon /> Código
          </a>
        ) : (
          <span className="project-card__btn project-card__btn--disabled">
            <GitHubIcon /> Código
          </span>
        )}
      </div>

      {/* Glow de hover con el color del proyecto */}
      <div className="project-card__glow" />
    </article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(defaultProjects);
  const [loading,  setLoading]  = useState(true);

  const { ref: titleRef, isInView: titleVisible } = useInView();

  // Carga proyectos desde Firestore; si falla usa los datos por defecto
  useEffect(() => {
    async function fetchProjects() {
      try {
        const q   = query(collection(db, "projects"), orderBy("order", "asc"));
        const snap = await getDocs(q);

        if (!snap.empty) {
          const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setProjects(data);
        }
      } catch {
        // Sin Firebase configurado o sin conexión → se usan los datos locales
        console.info("Usando datos de proyectos locales (Firestore no configurado)");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section id="proyectos" className="projects">
      <div className="container">
        {/* Encabezado */}
        <div
          className={`section-header animate ${titleVisible ? "visible" : ""}`}
          ref={titleRef}
        >
          <span className="section-label">// proyectos</span>
          <h2 className="section-title">Lo que he construido</h2>
        </div>

        {/* Grid de cards */}
        {loading ? (
          <div className="projects__loading">
            <div className="projects__spinner" />
            <p>Cargando proyectos...</p>
          </div>
        ) : (
          <div className="projects__grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
