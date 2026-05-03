const createHttpError = require("../utils/createHttpError");

function notFound(req, res, next) {
  next(createHttpError(404, "Ruta no encontrada"));
}

module.exports = notFound;
