function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const message =
    statusCode === 404
      ? err.message || "Ruta no encontrada"
      : "Se ha producido un error inesperado.";

  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode);

  if (req.accepts("html")) {
    return res.render("error", {
      titulo: statusCode === 404 ? "No encontrado" : "Error",
      statusCode,
      message
    });
  }

  return res.json({
    status: statusCode,
    message
  });
}

module.exports = errorHandler;
