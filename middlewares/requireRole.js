function requireRole(allowedRoles) {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return function roleGuard(req, res, next) {
    if (!req.session.user) {
      req.session.flashMessage = {
        tipo: "warning",
        texto: "Debes iniciar sesión para continuar."
      };

      return res.redirect("/login");
    }

    if (roles.includes(req.session.user.rol)) {
      return next();
    }

    req.session.flashMessage = {
      tipo: "warning",
      texto: "No tienes permisos para realizar esa acción."
    };

    return res.redirect("/socios");
  };
}

module.exports = requireRole;