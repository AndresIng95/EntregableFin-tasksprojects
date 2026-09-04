# TaskFlow – Gestión de Proyectos y Tareas

Este entregable es un proyecto final que es una aplicación web desarrollada con React que permite a los usuarios autenticarse y gestionar proyectos y tareas mediante una API REST.

El objetivo del proyecto es practicar el desarrollo de una aplicación React completa, incluyendo autenticación, rutas protegidas, consumo de APIs, CRUD, formularios, hooks, Context y despliegue.

## 🚀 Demo

**Aplicación:** https://andresing95.github.io/EntregableFin-tasksprojects/

**API DOC:** https://d3ujwk09smrk9z.cloudfront.net/swagger-ui/index.html

## 🛠️ Tecnologías

- React + TypeScript
- Vite
- Material UI (MUI)
- Axios
- React Router
- JWT
- GitHub Actions
- GitHub Pages

## 📁 Estructura

La aplicación está organizada separando responsabilidades:

```text
src/
├── components/   # Formularios y componentes de proyectos/tareas
├── context/      # Autenticación y tema claro/oscuro
├── hooks/        # Lógica y estado reutilizable
├── pages/        # Login y Dashboard
├── services/     # Comunicación con la API mediante Axios
├── theme.ts      # Configuración de temas MUI
├── types.ts      # Tipos e interfaces TypeScript
├── App.tsx       # Rutas y configuración principal
└── ProtectedRoute.tsx
```

La comunicación sigue principalmente este flujo:
Pages → Components → Hooks → Services → Axios → API

El usuario inicia sesión mediante la API. La respuesta contiene un JWT, que se almacena en localStorage.
Axios utiliza un interceptor para agregar automáticamente el token a las peticiones:
Authorization: Bearer <token>

ProtectedRoute comprueba la autenticación antes de permitir el acceso al Dashboard. Si el usuario no está autenticado, es redirigido al Login.

📡 Consumo de API y CRUD

La comunicación HTTP está centralizada en httpClient.ts y las operaciones están separadas en services.

```text
Proyectos
GET /projects – listar proyectos
POST /projects – crear proyecto
PUT /projects/{id} – actualizar proyecto
DELETE /projects/{id} – eliminar proyecto

Tareas
GET /tasks – listar tareas
POST /projects/{projectId}/tasks – crear tarea
PUT /tasks/{id} – actualizar tarea
PATCH /tasks/{id}/status – cambiar estado
DELETE /tasks/{id} – eliminar tarea
```

Se utiliza PUT para actualizar los datos de una tarea y PATCH cuando solamente se modifica su estado.

📝 Formularios y estado

Los formularios utilizan useState y custom hooks para manejar sus valores, validaciones y envío.

Se controlan estados como:
```text
loading
error
saving
deleting
changingStatus
```
También se realizan validaciones antes de enviar información a la API, como longitud del título y fecha límite.

🧩 Hooks y Context

Se utilizan custom hooks para separar la lógica de la interfaz:
```text
useProjects
useTasks
useProjectForm
useTaskForm
useProjectActions
useTaskActions
```
También se implementaron dos Context:

AuthContext – estado relacionado con la autenticación.
ThemeContext – controla el modo claro/oscuro.

La interfaz utiliza Material UI con temas personalizados para ambos modos.

⚙️ CI/CD y Deploy

El proyecto utiliza GitHub Actions para automatizar el build y deployment.
La aplicación está publicada mediante GitHub Pages.

👨‍💻 Proyecto Final

Proyecto desarrollado como parte del curso de React.

Autor: Andres Carlos Barrera
