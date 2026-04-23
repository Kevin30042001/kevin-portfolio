import { useEffect, useState } from "react";
import { personalInfo } from "../data/portfolio-data";
import { useInView } from "../hooks/useInView";
import kevinPhoto from "../images/foto-kevin.jpg";
import "./Hero.css";

// Iconos SVG inline (sin dependencias externas)
const GithubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// Componente de typing effect para el subtítulo
function TypewriterText({ texts, speed = 80, pause = 2000 }) {
  const [displayed, setDisplayed]   = useState("");
  const [textIndex, setTextIndex]   = useState(0);
  const [charIndex, setCharIndex]   = useState(0);
  const [deleting,  setDeleting]    = useState(false);

  useEffect(() => {
    const current = texts[textIndex];

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((i) => i + 1), speed);
      return () => clearTimeout(t);
    }

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex((i) => i - 1), speed / 2);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
    }
  }, [charIndex, deleting, textIndex, texts, speed, pause]);

  useEffect(() => {
    setDisplayed(texts[textIndex].slice(0, charIndex));
  }, [charIndex, textIndex, texts]);

  return (
    <span className="typewriter">
      {displayed}
      <span className="typewriter__cursor" aria-hidden="true">|</span>
    </span>
  );
}

export default function Hero() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="hero">
      {/* Glows ambientales de fondo */}
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

      <div className="container hero__inner" ref={ref}>
        {/* ── Columna izquierda: texto ── */}
        <div className="hero__content">
          {/* Saludo en monospace */}
          <p className={`hero__greeting animate ${isInView ? "visible" : ""} animate-delay-1`}>
            Hola, soy
          </p>

          {/* Nombre con degradado */}
          <h1 className={`hero__name animate ${isInView ? "visible" : ""} animate-delay-2`}>
            {personalInfo.shortName}
          </h1>

          {/* Título con typewriter */}
          <h2 className={`hero__title animate ${isInView ? "visible" : ""} animate-delay-3`}>
            <TypewriterText
              texts={[
                personalInfo.title,
                personalInfo.subtitle,
                "Apasionado por el código limpio",
              ]}
            />
          </h2>

          {/* Bio corta */}
          <p className={`hero__bio animate ${isInView ? "visible" : ""} animate-delay-4`}>
            {personalInfo.bio}
          </p>

          {/* Botones de acción */}
          <div className={`hero__actions animate ${isInView ? "visible" : ""} animate-delay-5`}>
            <button
              className="btn btn-primary"
              onClick={() => handleScroll("#proyectos")}
            >
              Ver proyectos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <a
              className="btn btn-outline"
              href="/Kevin_Chavez_CV.pdf"
              download="Kevin_Chavez_CV.pdf"
              aria-label="Descargar CV de Kevin Chávez"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar CV
            </a>
            <button
              className="btn btn-ghost"
              onClick={() => handleScroll("#contacto")}
            >
              Contacto
            </button>
          </div>

          {/* Iconos sociales */}
          <div className={`hero__socials animate ${isInView ? "visible" : ""} animate-delay-5`}>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hero__social-link">
              <GithubIcon />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hero__social-link">
              <LinkedinIcon />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="hero__social-link">
              <EmailIcon />
            </a>
            <div className="hero__social-line" />
          </div>
        </div>

        {/* ── Columna derecha: foto ── */}
        <div className={`hero__photo-wrapper animate ${isInView ? "visible" : ""} animate-delay-3`}>
          <div className="hero__photo-ring">
            <div className="hero__photo-glow" />
            <img
              src={kevinPhoto}
              alt="Kevin Chávez — Desarrollador Full Stack"
              className="hero__photo"
            />
          </div>
          {/* Badge flotante: disponible */}
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Disponible para trabajar
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="hero__scroll-indicator">
        <span>scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
