# Gestor de Asociaciones

Aplicación web para la gestión interna de una asociación, construida como un monolito modular con Express, EJS y MySQL.
El proyecto resuelve autenticación, control por roles y gestión de socios y usuarios, con una base preparada para crecer hacia módulos administrativos más amplios.

## Resumen rápido
| Campo | Valor |
| --- | --- |
| Tipo de aplicación | Gestión web para asociaciones |
| Backend | Node.js + Express 5 |
| Plantillas | EJS |
| Persistencia | MySQL 8 |
| Autenticación | Sesión de usuario |
| Autorización | Roles (`admin`, `gestor`, `lectura`) |
| Estilos | Tailwind CSS |
| Despliegue | Local o Docker Compose |

## Qué incluye ahora
| Módulo | Estado |
| --- | --- |
| Inicio de sesión y cierre de sesión | Funcional |
| Dashboard con resumen y últimos socios | Funcional |
| CRUD de socios | Funcional |
| Alta y listado de usuarios | Funcional |
| Control de acceso por rol | Funcional |
| Validación de formularios | Funcional |
| Mensajes flash | Funcional |
| Tests automáticos | Funcional (helpers y middlewares) |
| Cuotas, pagos, actividades e inscripciones | Pendiente |

## Tecnologías
| Tecnología | Uso |
| --- | --- |
| Node.js | Runtime de la aplicación |
| Express 5 | Servidor HTTP y rutas |
| EJS | Renderizado de vistas |
| MySQL 8 | Base de datos relacional |
| mysql2 | Acceso a datos |
| express-session | Sesión de usuario |
| express-validator | Validación de formularios |
| bcryptjs | Hash de contraseñas |
| Tailwind CSS | UI y utilidades visuales |
| Docker / Docker Compose | Entorno reproducible |
| ESLint / Prettier | Calidad y formato |

## Requisitos
| Requisito | Detalle |
| --- | --- |
| Node.js | Instalado junto con npm |
| MySQL | Versión 8 o compatible |
| Base de datos | Esquema importado desde `database/schema.sql` |
| Variables de entorno | Configuradas a partir de `.env.example` |
| Docker | Opcional, para levantar el entorno completo |

## Instalación
1. Clonar el repositorio.
2. Instalar dependencias con `npm install`.
3. Crear la base de datos `gestor_asociaciones` e importar `database/schema.sql`.
4. Importar `database/seed.sql` si se desean datos de prueba.
5. Copiar `.env.example` a `.env` y ajustar los valores.
6. Generar el CSS con `npm run build:css`.

## Arranque rápido con Docker
1. Asegúrate de tener Docker Desktop iniciado.
2. Ejecuta `npm run db:up` para levantar MySQL.
3. Ejecuta `npm run dev:full` para arrancar la aplicación con la base de datos disponible.

Si prefieres parar el contenedor cuando termines, usa `npm run db:down`.

## Ejecución
| Modo | Comando |
| --- | --- |
| Desarrollo | `npm run dev` |
| Producción local | `npm start` |
| Con Docker | `docker compose up --build` |
| Base de datos local | `npm run db:up` |
| Arranque completo | `npm run dev:full` |

## Variables de entorno
| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto de arranque |
| `NODE_ENV` | Entorno de ejecución (`development` o `production`) |
| `DB_HOST` | Host de MySQL |
| `DB_PORT` | Puerto de MySQL |
| `DB_NAME` | Nombre de la base de datos |
| `DB_USER` | Usuario de MySQL |
| `DB_PASSWORD` | Contraseña de MySQL |
| `SESSION_SECRET` | Secreto de sesión |

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
views/                  Vistas EJS y parciales reutilizables.
```

## Rutas principales
| Ruta | Descripción |
| --- | --- |
| `/login` | Acceso al sistema |
| `/dashboard` | Resumen general |
| `/socios` | Gestión de socios |
| `/usuarios` | Administración de usuarios |

## Estado del proyecto
La base principal está funcional y cubre autenticación, panel principal, gestión de socios y administración de usuarios.

Los módulos pendientes forman parte de la evolución natural del proyecto: cuotas, pagos, actividades, inscripciones y configuración.

## Mejoras previstas
| Prioridad | Mejora |
| --- | --- |
| Alta | Completar los módulos de cuotas, pagos, actividades e inscripciones |
| Alta | Añadir edición y baja de usuarios |
| Alta | Introducir persistencia de sesión con un store compartido |
| Alta | Incorporar pruebas automatizadas reales |
| Media | Pulir la capa visual con una interfaz más cuidada, consistente y atractiva |
| Media | Separar migraciones y seeds de forma más clara |
| Media | Mejorar el tratamiento de errores y duplicados |
| Media | Revisar la experiencia visual del frontend con una capa más cuidada |
| Baja | Exponer una API si se necesita integrar otra interfaz |
| Baja | Completar módulos secundarios del menú lateral |

## Hoja de ruta
| Fase | Enfoque |
| --- | --- |
| Siguiente iteración | Cerrar usuarios, seguridad y pruebas reales |
| Siguiente bloque funcional | Cuotas, pagos, actividades e inscripciones |
| Evolución posterior | Refuerzo visual, API externa y módulos secundarios |

## Notas de implementación
| Punto | Detalle |
| --- | --- |
| API pública | No existe una API JSON separada; la app renderiza HTML con EJS |
| Menú lateral | Los módulos pendientes aparecen como guía de evolución |
| Calidad | El proyecto usa ESLint y Prettier para mantener consistencia |
