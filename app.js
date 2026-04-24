require("dotenv").config();

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
console.log(process.env.SESSION_SECRET);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// Rutas
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const sociosRouter = require ("./routes/socios");

app.use("/", indexRouter);
app.use ("/login",authRouter);
app.use ("/socios",sociosRouter);

// Servidor
app.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});