function requireAuth(req, res, next) {
  if (req.session.user) {
    return next();
  }

  req.session.flashMessage = {
    tipo: "warning",
    texto: "Debes iniciar sesión para continuar."
  };

  return res.redirect("/login");
}

module.exports = requireAuth;