# Kevin Chávez — Portfolio Web

> 🌐 **[kevinchavez.dev](https://kevinchavez.dev)** — Desarrollador Full Stack Jr. | Soporte Técnico IT

Landing page personal con panel de administración para gestionar proyectos. Construido con React + Vite + Firebase Firestore.

---

## 🛠️ Stack técnico

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| React Router DOM v6 | Navegación y rutas |
| Firebase Firestore | Base de datos de proyectos |
| CSS Variables + Google Fonts | Sistema de diseño |
| Vercel | Deploy y hosting |

---

## 🚀 Inicio rápido

### 1. Clonar el repositorio

```bash
git clone https://github.com/Kevin30042001/kevin-portfolio.git
cd kevin-portfolio
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=1:xxx:web:xxx

VITE_ADMIN_PASSWORD=tu_contraseña_segura
```

### 4. Correr en local

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

---

## 📁 Estructura del proyecto

```
kevin-portfolio/
├── public/
│   └── foto-kevin.jpg          ← foto de perfil
├── src/
│   ├── admin/                  ← panel administrador
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ProjectForm.jsx
│   │   └── Admin.css
│   ├── components/             ← secciones del portafolio
│   │   ├── Navbar.jsx / .css
│   │   ├── Hero.jsx / .css
│   │   ├── About.jsx / .css
│   │   ├── Projects.jsx / .css
│   │   ├── Experience.jsx / .css
│   │   ├── Education.jsx / .css
│   │   ├── Contact.jsx / .css
│   │   └── Footer.jsx / .css
│   ├── data/
│   │   └── portfolio-data.js   ← TODA la info editable aquí
│   ├── firebase/
│   │   └── config.js           ← configuración Firebase
│   ├── hooks/
│   │   └── useInView.js        ← animaciones al hacer scroll
│   ├── App.jsx                 ← rutas principales
│   ├── index.css               ← sistema de diseño global
│   └── main.jsx
├── .env.example                ← template de variables de entorno
├── .gitignore
├── firestore.rules             ← reglas de seguridad Firestore
└── README.md
```

---

## 🔐 Panel de administración

Accede en `/admin` con la contraseña configurada en `VITE_ADMIN_PASSWORD`.

### ¿Qué puedes hacer?
- ✅ Agregar nuevos proyectos
- ✅ Editar proyectos existentes (nombre, descripción, stack, links, color, ícono)
- ✅ Eliminar proyectos
- ✅ Cambiar el orden de aparición
- ✅ Activar / desactivar el badge "🚧 Próximamente"

Los proyectos se guardan en **Firebase Firestore** y se muestran automáticamente en la sección de proyectos del portafolio.

---

## 📝 Actualizar datos personales

Todos los datos editables están centralizados en `src/data/portfolio-data.js`:

- `personalInfo` — nombre, email, teléfono, GitHub, LinkedIn, bio
- `skills` — tecnologías por categoría
- `experience` — experiencia laboral
- `education` — historial académico
- `defaultProjects` — proyectos de fallback (si Firestore está vacío)

---

## 🌐 Deploy en Vercel

### Primera vez

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Configurar variables de entorno en Vercel

Ve a **vercel.com → tu proyecto → Settings → Environment Variables** y agrega todas las variables del `.env`.

> ⚠️ **Importante:** Nunca hagas commit del archivo `.env` — está en `.gitignore`.

### Actualizaciones futuras

```bash
git add .
git commit -m "feat: actualizar proyectos"
git push
```

Vercel hace el deploy automático al hacer push a `main`.

---

## 📜 Commits sugeridos

```
feat: setup vite project with react
feat: add portfolio data file with all personal info
feat: create navbar with scroll spy and blur effect
feat: build hero section with animated entrance
feat: add about section with technology badges
feat: create project cards with hover effects
feat: add experience section
feat: build education timeline
feat: create contact section and footer
feat: add admin panel with firebase firestore
style: add global styles, fonts and animations
feat: add responsive design for mobile
docs: add README with setup instructions
feat: deploy to vercel
```

---

## 🧑‍💻 Autor

**Kevin Adonay Chávez Ramírez**  
📍 San Salvador, El Salvador  
✉️ [kevincha866@gmail.com](mailto:kevincha866@gmail.com)  
🔗 [GitHub](https://github.com/Kevin30042001) · [LinkedIn](https://www.linkedin.com/in/kevin-adonay-chavez-ram%C3%ADrez-8a53a1218/)

---

*Última actualización: abril 2026*
