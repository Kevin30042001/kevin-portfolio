import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Pequeño delay para que no sea instantáneo (anti-brute force visual)
    await new Promise((r) => setTimeout(r, 600));

    const correct = import.meta.env.VITE_ADMIN_PASSWORD;

    if (password === correct) {
      // Guarda la sesión en sessionStorage (se borra al cerrar el tab)
      sessionStorage.setItem("admin_auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Contraseña incorrecta. Intenta de nuevo.");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="admin-login">
      {/* Glows de fondo */}
      <div className="admin-login__glow admin-login__glow--1" />
      <div className="admin-login__glow admin-login__glow--2" />

      <div className="admin-login__card">
        {/* Logo */}
        <div className="admin-login__logo">
          <span className="admin-login__logo-bracket">&lt;</span>
          KC
          <span className="admin-login__logo-bracket"> /&gt;</span>
        </div>

        <h1 className="admin-login__title">Panel Admin</h1>
        <p className="admin-login__subtitle">Acceso restringido — solo para el propietario</p>

        {/* Formulario */}
        <form className="admin-login__form" onSubmit={handleSubmit}>
          <div className="admin-login__field">
            <label htmlFor="admin-password" className="admin-login__label">
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`admin-login__input ${error ? "admin-login__input--error" : ""}`}
              placeholder="••••••••••"
              autoFocus
              required
            />
          </div>

          {error && (
            <p className="admin-login__error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary admin-login__submit"
            disabled={loading || !password}
            id="admin-login-btn"
          >
            {loading ? (
              <>
                <span className="admin-login__spinner" />
                Verificando...
              </>
            ) : (
              "Entrar al panel"
            )}
          </button>
        </form>

        {/* Volver al portafolio */}
        <a href="/" className="admin-login__back">
          ← Volver al portafolio
        </a>
      </div>
    </div>
  );
}
