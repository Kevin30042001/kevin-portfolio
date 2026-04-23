// ============================================================
// ARCHIVO CENTRAL DE DATOS — edita aquí sin tocar componentes
// ============================================================

export const personalInfo = {
  name: "Kevin Adonay Chávez Ramírez",
  shortName: "Kevin Chávez",
  title: "Desarrollador Full Stack Jr.",
  subtitle: "Soporte Técnico IT",
  location: "San Salvador, El Salvador",
  email: "kevincha866@gmail.com",
  phone: "+503 7014-2274",
  github: "https://github.com/Kevin30042001",
  linkedin: "https://www.linkedin.com/in/kevin-adonay-chavez-ram%C3%ADrez-8a53a1218/",
  bio: "Estudiante de último ciclo de Ingeniería en Sistemas con formación técnica en mantenimiento de hardware y desarrollo de software full stack. Experiencia práctica en soporte IT empresarial y construcción de aplicaciones web y móviles con tecnologías modernas. Apasionado por resolver problemas reales con código limpio y buenas prácticas.",
};

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5 / CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Spring Boot", "REST APIs", "JWT"],
  },
  {
    category: "Bases de datos",
    items: ["PostgreSQL", "MySQL", "SQL Server", "Firebase / Firestore", "Core Data"],
  },
  {
    category: "Móvil",
    items: ["Android (Java)", "iOS (SwiftUI)", "Flutter (Dart)"],
  },
  {
    category: "Herramientas",
    items: ["Git / GitHub", "VS Code", "Postman", "Vercel", "Railway", "Power BI"],
  },
];

// Los proyectos también se cargan desde Firestore (panel admin),
// pero estos son los datos iniciales / fallback si Firestore está vacío.
export const defaultProjects = [
  {
    id: "finance-tracker",
    name: "Finance Tracker",
    subtitle: "App de Finanzas Personales",
    description: "Seguimiento de ingresos, gastos y metas financieras con gráficas interactivas y autenticación segura.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Recharts"],
    color: "#10B981",
    icon: "📊",
    liveUrl: "",
    repoUrl: "",
    comingSoon: true,
  },
  {
    id: "devlinks",
    name: "DevLinks",
    subtitle: "Agregador de Links",
    description: "Plataforma para centralizar y compartir tus links profesionales con drag-and-drop y temas personalizables.",
    stack: ["React", "Firebase", "@dnd-kit", "CSS Variables"],
    color: "#8B5CF6",
    icon: "🔗",
    liveUrl: "",
    repoUrl: "",
    comingSoon: true,
  },
  {
    id: "job-board",
    name: "Job Board",
    subtitle: "Tablero de Empleos Remotos",
    description: "Directorio de empleos remotos con filtros avanzados, búsqueda en tiempo real y guardado de favoritos.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Zustand"],
    color: "#F59E0B",
    icon: "💼",
    liveUrl: "",
    repoUrl: "",
    comingSoon: true,
  },
  {
    id: "ai-resume",
    name: "AI Resume Reviewer",
    subtitle: "Analizador de CVs con IA",
    description: "Sube tu CV en PDF y recibe feedback detallado impulsado por IA con sugerencias de mejora específicas.",
    stack: ["React", "Node.js", "Anthropic API", "pdf-parse"],
    color: "#EC4899",
    icon: "🤖",
    liveUrl: "",
    repoUrl: "",
    comingSoon: true,
  },
];

export const experience = [
  {
    role: "Técnico de Soporte IT / Asistente de Bodega",
    company: "GreenTech — Computadoras El Salvador",
    period: "Oct 2023 – Dic 2024",
    responsibilities: [
      "Ensamble y diagnóstico de PCs, laptops y mini PCs reacondicionadas (HP, Dell, Lenovo)",
      "Reemplazo de componentes defectuosos: SSD, RAM, CPU, batería CMOS",
      "Gestión de inventario de bodega y preparación de pedidos",
      "Instalación de Windows, Office y configuración de redes e impresoras",
    ],
  },
];

export const education = [
  {
    title: "Ingeniería en Sistemas",
    institution: "UTEC",
    period: "2020 – actualidad",
    detail: "Último ciclo — Preespecialidad",
  },
  {
    title: "Bootcamp Full Stack Jr.",
    institution: "Kodigo + INCAF",
    period: "2024 – 2025",
    detail: "HTML, CSS, JS, TS, React, Laravel, Next.js",
  },
  {
    title: "Bootcamp Java Developer",
    institution: "Kodigo",
    period: "2024",
    detail: "Java OOP, Spring Boot, APIs REST",
  },
  {
    title: "Técnico en Mantenimiento de Computadoras",
    institution: "INSAFORP / INCAF",
    period: "2022 – 2023",
    detail: "1 año 2 meses",
  },
  {
    title: "Bachillerato General",
    institution: "Colegio San Martín de Porres",
    period: "2017 – 2018",
    detail: "",
  },
];
