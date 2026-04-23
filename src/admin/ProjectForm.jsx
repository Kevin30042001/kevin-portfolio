import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import "./Admin.css";

// Opciones de colores predefinidos para el selector
const COLOR_OPTIONS = [
  { label: "Verde",   value: "#10B981" },
  { label: "Cyan",    value: "#64FFDA" },
  { label: "Morado",  value: "#8B5CF6" },
  { label: "Amarillo",value: "#F59E0B" },
  { label: "Rosa",    value: "#EC4899" },
  { label: "Azul",    value: "#3B82F6" },
  { label: "Rojo",    value: "#EF4444" },
  { label: "Naranja", value: "#F97316" },
];

// Iconos / emojis sugeridos
const ICON_OPTIONS = ["📊","🔗","💼","🤖","🛒","📱","🎮","🌐","🔐","📈","🧩","⚡"];

// Valor inicial del formulario
const EMPTY_FORM = {
  name:        "",
  subtitle:    "",
  description: "",
  stack:       "",   // se guarda como string separado por comas
  color:       "#10B981",
  icon:        "📊",
  liveUrl:     "",
  repoUrl:     "",
  comingSoon:  true,
  order:       0,
};

export default function ProjectForm({ project, onSaved, onCancel, projectCount }) {
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const isEditing = Boolean(project);

  // Si viene un proyecto para editar, pre-llena el formulario
  useEffect(() => {
    if (project) {
      setForm({
        ...project,
        stack: Array.isArray(project.stack) ? project.stack.join(", ") : project.stack,
        order: project.order ?? 0,
      });
    } else {
      setForm({ ...EMPTY_FORM, order: projectCount });
    }
  }, [project, projectCount]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (!form.name.trim() || !form.description.trim()) {
      setError("El nombre y la descripción son obligatorios.");
      return;
    }

    setSaving(true);

    try {
      // Convierte el stack de string a array
      const stackArray = form.stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const data = {
        name:        form.name.trim(),
        subtitle:    form.subtitle.trim(),
        description: form.description.trim(),
        stack:       stackArray,
        color:       form.color,
        icon:        form.icon,
        liveUrl:     form.liveUrl.trim(),
        repoUrl:     form.repoUrl.trim(),
        comingSoon:  form.comingSoon,
        order:       Number(form.order),
        updatedAt:   serverTimestamp(),
      };

      if (isEditing) {
        // Actualiza documento existente
        await updateDoc(doc(db, "projects", project.id), data);
        onSaved(`✅ "${form.name}" actualizado correctamente`);
      } else {
        // Crea nuevo documento
        data.createdAt = serverTimestamp();
        await addDoc(collection(db, "projects"), data);
        onSaved(`✅ "${form.name}" agregado correctamente`);
      }
    } catch (err) {
      console.error(err);
      setError("Error al guardar en Firestore. ¿Configuraste Firebase en el .env?");
    } finally {
      setSaving(false);
    }
  };

  return (
    /* Overlay/modal */
    <div className="pform-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="pform">
        {/* Header */}
        <div className="pform__header">
          <h2 className="pform__title">
            {isEditing ? `Editar — ${project.name}` : "Nuevo proyecto"}
          </h2>
          <button className="pform__close" onClick={onCancel} aria-label="Cerrar">✕</button>
        </div>

        <form className="pform__body" onSubmit={handleSubmit}>
          {/* Grid de dos columnas */}
          <div className="pform__grid">
            {/* Nombre */}
            <div className="pform__field pform__field--full">
              <label htmlFor="pf-name" className="pform__label">Nombre *</label>
              <input
                id="pf-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="pform__input"
                placeholder="Finance Tracker"
                required
              />
            </div>

            {/* Subtítulo */}
            <div className="pform__field pform__field--full">
              <label htmlFor="pf-subtitle" className="pform__label">Subtítulo</label>
              <input
                id="pf-subtitle"
                name="subtitle"
                type="text"
                value={form.subtitle}
                onChange={handleChange}
                className="pform__input"
                placeholder="App de Finanzas Personales"
              />
            </div>

            {/* Descripción */}
            <div className="pform__field pform__field--full">
              <label htmlFor="pf-desc" className="pform__label">Descripción *</label>
              <textarea
                id="pf-desc"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="pform__textarea"
                placeholder="Breve descripción del proyecto (2-3 líneas)..."
                rows={3}
                required
              />
            </div>

            {/* Stack */}
            <div className="pform__field pform__field--full">
              <label htmlFor="pf-stack" className="pform__label">
                Stack <span className="pform__hint">separado por comas</span>
              </label>
              <input
                id="pf-stack"
                name="stack"
                type="text"
                value={form.stack}
                onChange={handleChange}
                className="pform__input"
                placeholder="React, Node.js, PostgreSQL, JWT"
              />
            </div>

            {/* URL Live */}
            <div className="pform__field">
              <label htmlFor="pf-live" className="pform__label">Demo en vivo</label>
              <input
                id="pf-live"
                name="liveUrl"
                type="url"
                value={form.liveUrl}
                onChange={handleChange}
                className="pform__input"
                placeholder="https://..."
              />
            </div>

            {/* URL Repo */}
            <div className="pform__field">
              <label htmlFor="pf-repo" className="pform__label">Repositorio GitHub</label>
              <input
                id="pf-repo"
                name="repoUrl"
                type="url"
                value={form.repoUrl}
                onChange={handleChange}
                className="pform__input"
                placeholder="https://github.com/..."
              />
            </div>

            {/* Selector de color */}
            <div className="pform__field">
              <label className="pform__label">Color de la card</label>
              <div className="pform__colors">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    className={`pform__color-btn ${form.color === c.value ? "pform__color-btn--active" : ""}`}
                    style={{ background: c.value }}
                    onClick={() => setForm((p) => ({ ...p, color: c.value }))}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Selector de icono */}
            <div className="pform__field">
              <label className="pform__label">Ícono</label>
              <div className="pform__icons">
                {ICON_OPTIONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className={`pform__icon-btn ${form.icon === icon ? "pform__icon-btn--active" : ""}`}
                    onClick={() => setForm((p) => ({ ...p, icon }))}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Orden y badge */}
            <div className="pform__field">
              <label htmlFor="pf-order" className="pform__label">Orden (posición)</label>
              <input
                id="pf-order"
                name="order"
                type="number"
                min="0"
                value={form.order}
                onChange={handleChange}
                className="pform__input"
              />
            </div>

            {/* Checkbox coming soon */}
            <div className="pform__field pform__field--checkbox">
              <label className="pform__checkbox-label">
                <input
                  name="comingSoon"
                  type="checkbox"
                  checked={form.comingSoon}
                  onChange={handleChange}
                  className="pform__checkbox"
                />
                <span>Mostrar badge "🚧 Próximamente"</span>
              </label>
            </div>
          </div>

          {/* Error */}
          {error && <p className="pform__error">{error}</p>}

          {/* Acciones */}
          <div className="pform__footer">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
              id="pform-submit-btn"
            >
              {saving ? (
                <><span className="admin-login__spinner" /> Guardando...</>
              ) : (
                isEditing ? "Guardar cambios" : "Agregar proyecto"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
