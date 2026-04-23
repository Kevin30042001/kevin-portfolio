import { personalInfo } from "../data/portfolio-data";
import { useInView } from "../hooks/useInView";
import "./Contact.css";

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.07 1.18 2 2 0 012.08 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.36-.36a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

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

export default function Contact() {
  const { ref: titleRef, isInView: titleVisible } = useInView();
  const { ref: contentRef, isInView: contentVisible } = useInView({ threshold: 0.1 });

  return (
    <section id="contacto" className="contact">
      {/* Glow de fondo */}
      <div className="contact__glow" />

      <div className="container">
        {/* Encabezado */}
        <div
          className={`section-header animate ${titleVisible ? "visible" : ""}`}
          ref={titleRef}
        >
          <span className="section-label">// contacto</span>
          <h2 className="section-title">¿Hablamos?</h2>
        </div>

        <div
          className={`contact__inner animate ${contentVisible ? "visible" : ""}`}
          ref={contentRef}
        >
          {/* Texto de invitación */}
          <div className="contact__text">
            <p className="contact__lead">
              Estoy activamente buscando mi primera oportunidad como desarrollador.
              Si tienes un proyecto, una vacante o simplemente quieres conectar,
              <strong> no dudes en escribirme</strong> — respondo siempre.
            </p>
          </div>

          {/* Botones principales */}
          <div className="contact__buttons">
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn btn-primary contact__btn-main"
              id="contact-email-btn"
            >
              <EmailIcon />
              {personalInfo.email}
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="btn btn-outline contact__btn-main"
              id="contact-phone-btn"
            >
              <PhoneIcon />
              {personalInfo.phone}
            </a>
          </div>

          {/* Links secundarios */}
          <div className="contact__links">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link"
              id="contact-github-link"
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
            <div className="contact__divider" />
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link"
              id="contact-linkedin-link"
            >
              <LinkedinIcon />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
