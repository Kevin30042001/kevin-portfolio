import { skills, personalInfo } from "../data/portfolio-data";
import { useInView } from "../hooks/useInView";
import "./About.css";

export default function About() {
  const { ref: titleRef, isInView: titleVisible } = useInView();
  const { ref: bioRef,   isInView: bioVisible   } = useInView();
  const { ref: skillRef, isInView: skillVisible  } = useInView({ threshold: 0.08 });

  return (
    <section id="sobre-mi" className="about">
      <div className="container">
        {/* Encabezado de sección */}
        <div
          className={`section-header animate ${titleVisible ? "visible" : ""}`}
          ref={titleRef}
        >
          <span className="section-label">// sobre mí</span>
          <h2 className="section-title">¿Quién soy?</h2>
        </div>

        <div className="about__grid">
          {/* Bio */}
          <div
            className={`about__bio animate ${bioVisible ? "visible" : ""}`}
            ref={bioRef}
          >
            <p className="about__bio-text">{personalInfo.bio}</p>

            {/* Info extra */}
            <div className="about__meta">
              <div className="about__meta-item">
                <span className="about__meta-icon">📍</span>
                <span>{personalInfo.location}</span>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-icon">🎓</span>
                <span>Ing. en Sistemas — UTEC (último ciclo)</span>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-icon">💼</span>
                <span>Disponible para trabajar</span>
              </div>
            </div>
          </div>

          {/* Skills por categoría */}
          <div
            className={`about__skills animate ${skillVisible ? "visible" : ""}`}
            ref={skillRef}
          >
            {skills.map((group, i) => (
              <div
                key={group.category}
                className="about__skill-group"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <h3 className="about__skill-category">{group.category}</h3>
                <div className="about__skill-pills">
                  {group.items.map((item) => (
                    <span key={item} className="badge about__pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
