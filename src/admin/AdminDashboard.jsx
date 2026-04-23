import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { defaultProjects } from "../data/portfolio-data";
import ProjectForm from "./ProjectForm";
import "./Admin.css";

// Icono de editar
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

// Icono de eliminar
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
);

// Icono de añadir
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

// Tarjeta de proyecto en el dashboard
function ProjectRow({ project, onEdit, onDelete, deleting }) {
  return (
    <div className="dash-row" style={{ "--project-color": project.color }}>
      {/* Color indicator */}
      <div className="dash-row__color" />

      {/* Info */}
      <div className="dash-row__info">
        <span className="dash-row__icon">{project.icon}</span>
        <div>
          <p className="dash-row__name">{project.name}</p>
          <p className="dash-row__subtitle">{project.subtitle}</p>
        </div>
      </div>

      {/* Stack pills (máx 3) */}
      <div className="dash-row__stack">
        {(project.stack || []).slice(0, 3).map((t) => (
          <span key={t} className="badge dash-row__badge">{t}</span>
        ))}
        {project.stack?.length > 3 && (
          <span className="badge">+{project.stack.length - 3}</span>
        )}
      </div>

      {/* Estado */}
      <span className={`dash-row__status ${project.comingSoon ? "dash-row__status--soon" : "dash-row__status--live"}`}>
        {project.comingSoon ? "🚧 Próximamente" : "✅ Activo"}
      </span>

      {/* Acciones */}
      <div className="dash-row__actions">
        <button
          className="dash-row__btn dash-row__btn--edit"
          onClick={() => onEdit(project)}
          title="Editar proyecto"
        >
          <EditIcon />
        </button>
        <button
          className="dash-row__btn dash-row__btn--delete"
          onClick={() => onDelete(project)}
          disabled={deleting === project.id}
          title="Eliminar proyecto"
        >
          {deleting === project.id ? (
            <span className="admin-login__spinner" style={{ width: 14, height: 14 }} />
          ) : (
            <TrashIcon />
          )}
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [projects,    setProjects]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [usingLocal,  setUsingLocal]  = useState(false);
  const [showForm,    setShowForm]    = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [deleting,    setDeleting]    = useState(null);
  const [toast,       setToast]       = useState(null);
  const navigate = useNavigate();

  // Protección de ruta: si no está autenticado, redirige al login
  useEffect(() => {
    if (!sessionStorage.getItem("admin_auth")) {
      navigate("/admin");
    }
  }, [navigate]);

  // Carga proyectos desde Firestore
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const q    = query(collection(db, "projects"), orderBy("order", "asc"));
      const snap = await getDocs(q);

      if (!snap.empty) {
        setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setUsingLocal(false);
      } else {
        // Firestore vacío → muestra los datos de fallback como referencia
        setProjects(defaultProjects);
        setUsingLocal(true);
      }
    } catch {
      setProjects(defaultProjects);
      setUsingLocal(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  // Muestra un toast breve
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Elimina un proyecto de Firestore
  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `¿Eliminar "${project.name}"?\nEsta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    setDeleting(project.id);
    try {
      await deleteDoc(doc(db, "projects", project.id));
      showToast(`"${project.name}" eliminado correctamente`);
      await fetchProjects();
    } catch (err) {
      showToast("Error al eliminar. ¿Firestore configurado?", "error");
    } finally {
      setDeleting(null);
    }
  };

  // Abre el formulario para editar
  const handleEdit = (project) => {
    setEditProject(project);
    setShowForm(true);
  };

  // Después de guardar (add/edit)
  const handleSaved = (msg) => {
    setShowForm(false);
    setEditProject(null);
    showToast(msg);
    fetchProjects();
  };

  // Cierra sesión
  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    navigate("/admin");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar__logo">
          <span className="admin-login__logo-bracket">&lt;</span>KC
          <span className="admin-login__logo-bracket"> /&gt;</span>
        </div>

        <nav className="dash-sidebar__nav">
          <button className="dash-sidebar__item dash-sidebar__item--active">
            📂 Proyectos
          </button>
        </nav>

        <div className="dash-sidebar__footer">
          <a href="/" className="dash-sidebar__portfolio-link" target="_blank" rel="noopener noreferrer">
            🌐 Ver portafolio
          </a>
          <button className="dash-sidebar__logout" onClick={handleLogout}>
            ← Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="dash-main">
        {/* Header */}
        <div className="dash-header">
          <div>
            <h1 className="dash-header__title">Proyectos</h1>
            <p className="dash-header__subtitle">
              {usingLocal
                ? "⚠️ Mostrando datos locales — Firebase no configurado"
                : `${projects.length} proyecto${projects.length !== 1 ? "s" : ""} en Firestore`}
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => { setEditProject(null); setShowForm(true); }}
            id="add-project-btn"
          >
            <PlusIcon /> Nuevo proyecto
          </button>
        </div>

        {/* Lista de proyectos */}
        {loading ? (
          <div className="dash-loading">
            <div className="projects__spinner" />
            <p>Cargando proyectos...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="dash-empty">
            <p>No hay proyectos todavía.</p>
            <button
              className="btn btn-outline"
              onClick={() => { setEditProject(null); setShowForm(true); }}
            >
              <PlusIcon /> Agregar el primero
            </button>
          </div>
        ) : (
          <div className="dash-list">
            {projects.map((p) => (
              <ProjectRow
                key={p.id}
                project={p}
                onEdit={handleEdit}
                onDelete={handleDelete}
                deleting={deleting}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal de formulario */}
      {showForm && (
        <ProjectForm
          project={editProject}
          onSaved={handleSaved}
          onCancel={() => { setShowForm(false); setEditProject(null); }}
          projectCount={projects.length}
        />
      )}

      {/* Toast de notificación */}
      {toast && (
        <div className={`dash-toast ${toast.type === "error" ? "dash-toast--error" : ""}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
