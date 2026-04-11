const express = require("express");
const path = require("path");

const app = express();

// Configuración
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Archivos públicos
app.use(express.static(path.join(__dirname, "public")));

// Rutas
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

app.use("/", indexRouter);
app.use ("/login",authRouter);
// Servidor
app.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});