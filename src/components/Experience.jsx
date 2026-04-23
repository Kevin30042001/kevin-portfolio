import { experience } from "../data/portfolio-data";
import { useInView } from "../hooks/useInView";
import "./Experience.css";

export default function Experience() {
  const { ref: titleRef, isInView: titleVisible } = useInView();
  const { ref: cardRef,  isInView: cardVisible  } = useInView({ threshold: 0.1 });

  return (
    <section id="experiencia" className="experience">
      <div className="container">
        {/* Encabezado */}
        <div
          className={`section-header animate ${titleVisible ? "visible" : ""}`}
          ref={titleRef}
        >
          <span className="section-label">// experiencia</span>
          <h2 className="section-title">Experiencia laboral</h2>
        </div>

        <div
          className={`experience__list animate ${cardVisible ? "visible" : ""}`}
          ref={cardRef}
        >
          {experience.map((job, i) => (
            <article key={i} className="experience__card">
              {/* Línea lateral de color */}
              <div className="experience__accent-bar" />

              <div className="experience__content">
                {/* Header */}
                <div className="experience__header">
                  <div>
                    <h3 className="experience__role">{job.role}</h3>
                    <p className="experience__company">{job.company}</p>
                  </div>
                  <span className="badge experience__period">{job.period}</span>
                </div>

                {/* Responsabilidades */}
                <ul className="experience__list-items">
                  {job.responsibilities.map((item, j) => (
                    <li key={j} className="experience__item">
                      <span className="experience__bullet">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
