# Test Pokemon App

Esta es una aplicación front end para mostrar pokemones, creada con **React**, **Vite**, y **TypeScript**.

## Requerimientos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [npm](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/) (recomendado)


Sigue estos pasos para clonar el repositorio, instalar las dependencias y levantar el proyecto.

### 1. Clonar el repositorio

Clona el repositorio desde GitHub:

```bash
git clone https://github.com/antmol/test-pokemon-app
```
Navega al directorio del proyecto:

```bash
cd test-pokemon-app
```
### 2. Instalar dependencias
Instala las dependencias del proyecto usando npm o Yarn:

```bash
npm install
```
### 3. Levantar el proyecto
Una vez instaladas las dependencias, puedes levantar el servidor de desarrollo:

```bash
npm run dev
```
### 4. Construir para producción
Si deseas construir el proyecto para producción, ejecuta:

```bash
npm run build
```
5. Servir la versión de producción
Para servir la versión de producción localmente, puedes usar:

```bash
npm run preview
```
### Estructura del proyecto
El proyecto está organizado de la siguiente manera:
```bash
streaming-demo-app/
├── public/                 # Archivos públicos (imágenes, favicon, etc.)
├── src/                    # Código fuente de la aplicación
│   ├── App.css/            # Estilos
│   ├── App.tsx             # Componente principal de la aplicación
│   ├── main.tsx            # Punto de entrada de la aplicación
│   └── index.css           # Estilos globales
├── .env                    # Variables de entorno (opcional)
├── .gitignore              # Archivos y carpetas ignorados por Git
├── package.json            # Dependencias y scripts del proyecto
├── tsconfig.json           # Configuración de TypeScript
└── vite.config.ts          # Configuración de Vite
```

### Dependencias principales
React: Biblioteca para construir interfaces de usuario.

Vite: Herramienta de construcción rápida para proyectos modernos.

Redux: Manejo del estado global de la aplicación.

React Router: Navegación entre páginas.

TypeScript: Tipado estático para JavaScript.

Axios: Cliente HTTP para realizar peticiones a la API.

### Contribuir
Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.

2. Crea una rama con tu nueva funcionalidad (git checkout -b feature/nueva-funcionalidad).

3. Realiza tus cambios y haz commit (git commit -m 'Agrega nueva funcionalidad').

4. Sube tus cambios a GitHub (git push origin feature/nueva-funcionalidad).

5. Abre un Pull Request en GitHub.

### Licencia
Este proyecto está bajo la licencia MIT.
