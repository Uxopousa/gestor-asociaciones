# Gestor de Asociaciones

Aplicación web monolítica para la gestión de socios y cuentas de usuario de una asociación.
Está implementada con Express, EJS y MySQL, con persistencia en base de datos relacional.
El acceso se resuelve con sesión de usuario y control de permisos por rol.
Lo que está terminado ahora mismo es el panel principal, el CRUD de socios y la administración básica de usuarios.

## Funcionalidades

- Inicio de sesión y cierre de sesión.
- Dashboard con resumen de socios y últimos registros.
- Listado, alta, edición y baja lógica de socios.
- Listado y alta de usuarios del sistema.
- Control de acceso por sesión y por rol.
- Validación de formularios en servidor.
- Mensajes temporales de confirmación y error.
- Estructura preparada para módulos que todavía no están implementados: cuotas, pagos, actividades, inscripciones y configuración.

## Tecnologías

- Node.js
- Express 5
- EJS
- MySQL 8
- mysql2
- express-session
- express-validator
- bcryptjs
- Tailwind CSS
- dotenv
- Docker y Docker Compose
- ESLint

## Requisitos

- Node.js y npm.
- MySQL 8 o compatible.
- Base de datos creada con el esquema del proyecto.
- Variables de entorno configuradas.
- Opcional: Docker y Docker Compose para levantar todo el entorno.

## Instalación

1. Clona el repositorio.
2. Instala dependencias:

```bash
npm install
```

3. Crea la base de datos `gestor_asociaciones` e importa `database/schema.sql`.
4. Si quieres datos de prueba, importa también `database/seed.sql`.
5. Copia `.env.example` a `.env` y ajusta los valores.
6. Genera el CSS si hace falta:

```bash
npm run build:css
```

## Variables de entorno

Estas son las variables usadas por la aplicación:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gestor_asociaciones
DB_USER=gestor
DB_PASSWORD=gestor
SESSION_SECRET=change-me
```

## Ejecución

### Modo local

```bash
npm run dev
```

Para arrancar sin nodemon:

```bash
npm start
```

### Con Docker

```bash
docker compose up --build
```

## Estructura del proyecto

```text
app.js                 Punto de entrada de la aplicación.
config/                Configuración de entorno, base de datos y arranque de autenticación.
controllers/           Lógica de las rutas.
database/              Esquema SQL y datos de prueba.
middlewares/           Middleware de autenticación, roles, validación y errores.
models/                Consultas SQL encapsuladas por entidad.
public/                Archivos estáticos servidos por Express.
routes/                Definición de rutas HTTP.
src/styles/            Fuente de estilos de Tailwind.
utils/                 Utilidades compartidas.
views/                 Vistas EJS y parciales reutilizables.
```

## API

No hay una API JSON pública separada.
La aplicación renderiza HTML desde el servidor con EJS y usa rutas web para login, dashboard, socios y usuarios.

## Estado del proyecto

La parte principal está funcional:

- autenticación,
- panel principal,
- gestión de socios,
- alta y listado de usuarios.

Hay módulos que todavía no están desarrollados y solo aparecen como enlace o texto pendiente en la interfaz: cuotas, pagos, actividades, inscripciones y configuración.

## Posibles mejoras

- Añadir edición y baja de usuarios.
- Separar la inicialización de la base de datos en migraciones y seeds más claras.
- Sustituir el store de sesión en memoria por uno persistente.
- Incorporar pruebas automatizadas.
- Mejorar el tratamiento de errores de base de datos y conflictos por duplicado.
- Exponer una API si en el futuro hace falta integrar otra interfaz.
- Completar los módulos pendientes del menú lateral.
