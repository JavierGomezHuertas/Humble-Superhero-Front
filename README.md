<img src="https://nextjs.org/static/favicon/favicon-32x32.png" width="120" alt="Next.js Logo" />

# Frontend de Superhéroes con Next.js y Tailwind

Front para la Api de gestión de superhéroes. Diseñada con un estilo sencillo y un poco tecno construida con Next.js.

## 🚀 Características

- Interfaz cyberpunk moderna y responsive
- Gestión de superhéroes:
  - Creación de nuevos héroes con validación en tiempo real
  - Listado ordenado por nivel de humildad
  - Tarjetas interactivas con diseño tecno
- Diseño adaptativo (mobile-first)
- Efectos visuales y animaciones
- Manejo de estados y errores
- Integración con API REST

## 📋 Requisitos Previos

- Node.js v20+
- npm v9+
- API de Superhéroes (backend) corriendo en puerto 3000 o el elegido en .env

## 🔧 Instalación

Clonar repositorio:
git clone https://github.com/TuUsuario/superhero-frontend.git
cd superhero-frontend

Instalar dependencias:
npm install

Configurar variables de entorno:
.env.example

## 🏃 Ejecución

npm run dev    La aplicación estará disponible en: http://localhost:3001 o el elegido en .env

## 🎨 Estilo

- Paleta de colores:
  - Principal: `#007BFF`
  - Secundario: `#00FF99`
  - Acento: `#FFD700`
  - Alerta: `#FF3131`
  - Fondo: `#121212`

## 🔄 Integración con Backend

Endpoints Consumidos:
- `POST /superheroes`: Crear superhéroe
- `GET /superheroes`: Listar superhéroes

## 🧪 Validaciones

- Nombre: Campo requerido
- Superpoder: Campo requerido
- Nivel de Humildad:
  - Numérico entre 1 y 10
  - Máximo 1 decimal
  - Retroalimentación visual

## ⏳ Si tuviera más tiempo...

Estas son algunas mejoras y características que implementaría en futuras versiones:

### 💅 UI/UX
- Modo claro/oscuro
- Temas personalizables
- Animaciones de transición
- Skeleton loaders

### 🛠️ Funcionalidades
- Búsqueda y filtrado de héroes
- Edición y eliminación de héroes
- Paginación de resultados
- Vista detalle de héroe

### 📱 Responsive
- Mejoras para tablets
- Diseño específico para móviles
- PWA (Progressive Web App)

### 🔒 Seguridad
- Autenticación de usuarios
- Roles y permisos
- Protección de rutas

## 👥 Colaboración en Equipo

Ejemplo de practicas para trabajo en equipo:

## 🤝 División de Tareas

Frontend Core:
Componentes React
Integración con API
Manejo de estado

UI/UX:
Diseño responsive
Animaciones
Accesibilidad

Testing:
Pruebas unitarias
Testing
QA

## 📝 Flujo de Trabajo

1. Git Flow simplificado
   - main: producción
   - develop: desarrollo
   - feature/*: nuevas funcionalidades

Code review
Commits semánticos (feat:, fix:, style:)

## 📅 Coordinación
Dailys 15 mins cada mañana para:

Compartir progreso

Identificar bloqueos

Alinear prioridades
