require("./config/env");

const express = require("express");
const session = require("express-session");
const path = require("path");

const bootstrapAuth = require("./config/bootstrapAuth");

const app = express();
const isProduction = process.env.NODE_ENV === "production";

app.locals.databaseReady = true;

if (isProduction) {
  app.set("trust proxy", 1);
}

// Configuración
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Archivos públicos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "gestor-asociaciones-dev-secret",
    resave: false,
    saveUninitialized: false,
    name: "gestor.sid",
    proxy: isProduction,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: isProduction,
      maxAge: 1000 * 60 * 60 * 8
    }
  })
);

app.use((req, res, next) => {
  if (app.locals.databaseReady) {
    return next();
  }

  if (req.path === "/health") {
    return res.status(200).json({
      ok: true,
      mode: "degraded",
      message: "La aplicación ha arrancado, pero MySQL no está disponible."
    });
  }

  return res.status(503).send(`<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Gestor de Asociaciones</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: Arial, sans-serif;
        background: #f8fafc;
        color: #0f172a;
      }
      main {
        max-width: 520px;
        padding: 32px;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
      }
      h1 {
        margin-top: 0;
      }
      p {
        line-height: 1.6;
      }
      code {
        padding: 0.2rem 0.4rem;
        border-radius: 6px;
        background: #e2e8f0;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Gestor de Asociaciones</h1>
      <p>La aplicación ha arrancado, pero no puede acceder a MySQL en este momento.</p>
      <p>Revisa que la base de datos esté activa y que los datos de <code>.env</code> sean correctos.</p>
      <p>Si quieres comprobar el estado, abre <code>/health</code>.</p>
    </main>
  </body>
</html>`);
});

app.use((req, res, next) => {
  res.locals.appName = "Gestor de Asociaciones";
  res.locals.currentPath = req.path;
  res.locals.currentYear = new Date().getFullYear();
  res.locals.currentUser = req.session.user || null;
  res.locals.isAuthenticated = Boolean(req.session.user);
  res.locals.flashMessage = req.session.flashMessage;
  delete req.session.flashMessage;

  next();
});

// Rutas
const indexRouter = require("./routes/index");
const dashboardRouter = require("./routes/dashboard");
const authRouter = require("./routes/auth");
const sociosRouter = require("./routes/socios");
const usuariosRouter = require("./routes/usuarios");

app.use("/", indexRouter);
app.use("/dashboard", dashboardRouter);
app.use("/login", authRouter);
app.use("/socios", sociosRouter);
app.use("/usuarios", usuariosRouter);

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use(notFound);
app.use(errorHandler);

// Servidor
const port = process.env.PORT || 3000;

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isDatabaseStartupError(error) {
  return Boolean(
    error &&
      ["ECONNREFUSED", "ENOTFOUND", "PROTOCOL_CONNECTION_LOST", "ER_ACCESS_DENIED_ERROR"].includes(
        error.code
      )
  );
}

async function bootstrapAuthWithRetry(maxAttempts = 12, delayMs = 2000) {
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await bootstrapAuth();
      return;
    } catch (error) {
      lastError = error;

      if (!isDatabaseStartupError(error) || attempt === maxAttempts) {
        throw error;
      }

      console.warn(
        `MySQL todavía no está listo. Reintentando (${attempt}/${maxAttempts}) en ${delayMs / 1000} segundos...`
      );
      await wait(delayMs);
    }
  }

  throw lastError;
}

bootstrapAuthWithRetry()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor iniciado en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    if (isDatabaseStartupError(error)) {
      app.locals.databaseReady = false;

      console.warn(
        "No se pudo conectar a MySQL. La aplicación arrancará en modo degradado:"
      );
      console.warn(error.message);

      app.listen(port, () => {
        console.log(`Servidor iniciado en http://localhost:${port} (modo degradado)`);
      });

      return;
    }

    console.error("No se pudo inicializar la autenticación:", error);
    process.exit(1);
  });
