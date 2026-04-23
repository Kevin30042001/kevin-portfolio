import { education } from "../data/portfolio-data";
import { useInView } from "../hooks/useInView";
import "./Education.css";

function TimelineItem({ item, index }) {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`edu-item animate ${isInView ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Dot en la línea */}
      <div className="edu-item__dot-wrapper">
        <div className="edu-item__dot" />
        <div className="edu-item__connector" />
      </div>

      {/* Card de contenido */}
      <div className="edu-item__card">
        <div className="edu-item__header">
          <div>
            <h3 className="edu-item__title">{item.title}</h3>
            <p className="edu-item__institution">{item.institution}</p>
          </div>
          <span className="badge edu-item__period">{item.period}</span>
        </div>
        {item.detail && (
          <p className="edu-item__detail">{item.detail}</p>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  const { ref: titleRef, isInView: titleVisible } = useInView();

  return (
    <section id="educacion" className="education">
      <div className="container">
        {/* Encabezado */}
        <div
          className={`section-header animate ${titleVisible ? "visible" : ""}`}
          ref={titleRef}
        >
          <span className="section-label">// educación</span>
          <h2 className="section-title">Formación académica</h2>
        </div>

        {/* Timeline */}
        <div className="edu-timeline">
          {education.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
