
# 💱 Casa de Cambios Digital Bolivia

Este es un proyecto de certificación realizado en **React + TypeScript + Vite**, cuyo objetivo es construir una plataforma simulada para consultar casas de cambio y sus cotizaciones del dólar en Bolivia. La interfaz es moderna y responsive, con integración de mapas, gráficos y validaciones.

---

## ✅ Requerimientos Implementados

- 🔐 Registro y Login de usuarios (sin Context API / Redux)
- 🗺️ Mapa interactivo con casas de cambio (usando `react-leaflet`)
- 💹 Comparación entre tipo de cambio oficial y paralelo
- 🚨 Alerta personalizada de cotización del dólar
- 📈 Historial de cotizaciones por casa de cambio (con gráficos)
- 🛠️ CRUD completo para casas de cambio (admin simulado con `json-server`)
- 🧪 Validación de formularios con `Formik + Yup`
- 📱 Interfaz UI limpia y responsive con `Material UI`

---

## 🚀 Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/Andrezuu/proyecto-certi-react.git
cd proyecto-certi-react
````

### 2. Instala las dependencias

```bash
npm install
```

### 3. Corre el frontend

```bash
npm run dev
```

El proyecto se abrirá en: `http://localhost:5173`

---

## 🌐 Backend simulado con JSON Server

### 1. Instala JSON Server (si no lo tienes)

```bash
npm install -g json-server
```

### 2. Levanta el servidor de datos

```bash
json-server --watch db.json --port 3001
```

Esto simula un backend RESTful para casas de cambio, usuarios y cotizaciones.

---

## 🧭 Rutas de la Aplicación

| Ruta                | Descripción                                  |
| ------------------- | -------------------------------------------- |
| `/login`            | Página de inicio de sesión                   |
| `/register`         | Registro de nuevo usuario                    |
| `/app/dashboard`    | Panel principal con resumen                  |
| `/app/mapa`         | Mapa con casas de cambio                     |
| `/app/cotizaciones` | Comparación oficial vs paralelo              |
| `/app/alerta`       | Configuración de alerta por precio del dólar |
| `/app/historial`    | Historial de cotizaciones (gráfico)          |
| `/app/admin/casas`  | CRUD de casas de cambio (admin simulado)     |

---

## 📊 Tecnologías Usadas

| Categoría        | Tecnologías                          |
| ---------------- | ------------------------------------ |
| Frontend         | React, TypeScript, Vite              |
| UI               | Material UI (MUI), Styled Components |
| Formularios      | Formik + Yup                         |
| Ruteo            | React Router v6                      |
| Gráficos         | Chart.js, Recharts                   |
| Mapa             | Leaflet, React-Leaflet               |
| Backend simulado | JSON Server                          |
| Validaciones     | ESLint, TypeScript strict mode       |

---

## 📋 Criterios de Evaluación

| Criterio                            | Puntaje |
| ----------------------------------- | ------- |
| 🗺️ Mapa con datos funcionales      | 15%     |
| 🚨 Alerta funcional de cotización   | 15%     |
| 🛠️ CRUD funcional con validaciones | 15%     |
| 📈 Gráfico de historial             | 10%     |
| 🎨 UI limpia y responsive con MUI   | 15%     |
| 🗃️ JSON Server bien estructurado   | 10%     |
| ⚙️ Uso correcto de Hooks            | 10%     |
| 📖 Documentación técnica (README)   | 10%     |

---

## 🧠 Buenas prácticas implementadas

* Separación de lógica en componentes reutilizables.
* Uso correcto de hooks (`useEffect`, `useState`).
* Rutas protegidas con `ProtectedRoutes`.
* Interfaz centralizada con `Layout`.
* API centralizada mediante `axios`.

---

## 🧑‍💻 Colaboradores

Proyecto desarrollado por
- Andres Sanchez
- Luciano Vargas
- Alexia Marin
- Mateo Michel


