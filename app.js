require("./config/env");

const express = require("express");
const session = require("express-session");
const path = require("path");

const bootstrapAuth = require("./config/bootstrapAuth");

const app = express();
const isProduction = process.env.NODE_ENV === "production";

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
    secret: process.env.SESSION_SECRET,
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

bootstrapAuth()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor iniciado en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo inicializar la autenticación:", error);
    process.exit(1);
  });
