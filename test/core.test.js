const test = require("node:test");
const assert = require("node:assert/strict");

const createHttpError = require("../utils/createHttpError");
const asyncHandler = require("../utils/asyncHandler");
const requireAuth = require("../middlewares/requireAuth");
const requireRole = require("../middlewares/requireRole");

function crearReqRes(sessionUser = null) {
  const req = {
    session: {
      user: sessionUser,
      flashMessage: null
    }
  };

  const res = {
    redirectedTo: null,
    redirect(destination) {
      this.redirectedTo = destination;
      return this;
    }
  };

  const nextCalls = [];
  const next = (error) => {
    nextCalls.push(error);
  };

  return { req, res, next, nextCalls };
}

test("createHttpError conserva codigo y mensaje", () => {
  const error = createHttpError(404, "No encontrado");

  assert.equal(error.statusCode, 404);
  assert.equal(error.message, "No encontrado");
});

test("asyncHandler propaga errores a next", async () => {
  const error = new Error("Fallo controlado");
  const nextCalls = [];

  const handler = asyncHandler(async () => {
    throw error;
  });

  await handler({}, {}, (capturedError) => {
    nextCalls.push(capturedError);
  });

  assert.equal(nextCalls.length, 1);
  assert.equal(nextCalls[0], error);
});

test("requireAuth permite continuar si hay usuario en sesion", () => {
  const { req, res, next, nextCalls } = crearReqRes({ nombre: "Admin" });

  requireAuth(req, res, next);

  assert.equal(res.redirectedTo, null);
  assert.equal(nextCalls.length, 1);
});

test("requireAuth redirige al login si no hay usuario", () => {
  const { req, res, next, nextCalls } = crearReqRes();

  requireAuth(req, res, next);

  assert.equal(res.redirectedTo, "/login");
  assert.equal(req.session.flashMessage.tipo, "warning");
  assert.equal(nextCalls.length, 0);
});

test("requireRole permite usuarios con rol autorizado", () => {
  const guard = requireRole(["admin", "gestor"]);
  const { req, res, next, nextCalls } = crearReqRes({ rol: "gestor" });

  guard(req, res, next);

  assert.equal(res.redirectedTo, null);
  assert.equal(nextCalls.length, 1);
});

test("requireRole deniega acceso si el rol no coincide", () => {
  const guard = requireRole(["admin"]);
  const { req, res, next, nextCalls } = crearReqRes({ rol: "lectura" });

  guard(req, res, next);

  assert.equal(res.redirectedTo, "/socios");
  assert.equal(req.session.flashMessage.tipo, "warning");
  assert.equal(nextCalls.length, 0);
});