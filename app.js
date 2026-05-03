require("./config/env");

const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

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
    saveUninitialized: false
  })
);

app.use((req, res, next) => {
  res.locals.appName = "Gestor de Asociaciones";
  res.locals.currentPath = req.path;
  res.locals.currentYear = new Date().getFullYear();
  res.locals.flashMessage = req.session.flashMessage;
  delete req.session.flashMessage;

  next();
});

// Rutas
const indexRouter = require("./routes/index");
const dashboardRouter = require("./routes/dashboard");
const authRouter = require("./routes/auth");
const sociosRouter = require("./routes/socios");

app.use("/", indexRouter);
app.use("/dashboard", dashboardRouter);
app.use("/login", authRouter);
app.use("/socios", sociosRouter);

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use(notFound);
app.use(errorHandler);

// Servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
