const express = require("express");
const path = require("path");

const app = express();

// Configuración
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rutas
const indexRouter = require("./routes/index");

app.use("/", indexRouter);

// Servidor
app.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});