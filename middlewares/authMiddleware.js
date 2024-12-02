const authMiddleware = (req, res, next) => {
  // Verificar si el usuario está autenticado con passport
  if (req.isAuthenticated()) {
    return next(); // Usuario autenticado, continuar con la siguiente ruta
  } else {
    res.redirect("/login"); // Redirigir al login si no está autenticado
  }
};

export default authMiddleware;
