import { useState, useEffect } from "react";
import "./Navbar.css";

// Secciones para el menú de navegación
const NAV_LINKS = [
  { label: "Sobre mí",    href: "#sobre-mi"   },
  { label: "Proyectos",   href: "#proyectos"  },
  { label: "Experiencia", href: "#experiencia"},
  { label: "Educación",   href: "#educacion"  },
  { label: "Contacto",    href: "#contacto"   },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen,     setMenuOpen]     = useState(false);

  // Detecta si el usuario ya hizo scroll (para activar el blur/border)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: detecta qué sección está en viewport
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Cierra el menú mobile al cambiar tamaño de ventana
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        {/* Logo / nombre */}
        <a
          href="#inicio"
          className="navbar__logo"
          onClick={(e) => handleNavClick(e, "#inicio")}
        >
          <span className="navbar__logo-bracket">&lt;</span>
          KC
          <span className="navbar__logo-bracket"> /&gt;</span>
        </a>

        {/* Links desktop */}
        <nav className="navbar__links">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${activeSection === link.href.slice(1) ? "navbar__link--active" : ""}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span className="navbar__link-num">0{i + 1}.</span>
              {link.label}
            </a>
          ))}
        </nav>


        {/* Botón hamburguesa — mobile */}
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Menú mobile */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar__mobile-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            <span className="navbar__link-num">0{i + 1}.</span>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
