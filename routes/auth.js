import express from "express";
import passport from "passport";
import authMiddleware from "../middlewares/authMiddleware.js"; // Tu middleware de autenticación

const router = express.Router();

// Página de login
router.get("/", (req, res) => {
  res.render("login", { title: "Login Page", message: req.flash("message") });
});

// Página de login
router.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup Page", message: req.flash("message") });
});

// Manejar el login con passport
router.post("/", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return next(err); // Handle unexpected errors
    }
    if (!user) {
      // If authentication fails, redirect with a flash message
      req.flash("message", info?.message || "Invalid credentials");
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Redirect based on user role
      switch (user.user_type) {
        case "admin":
          return res.redirect("/dashboard/admin");
        case "empleado":
          return res.redirect("/dashboard/empleado");
        case "cliente":
          return res.redirect("/dashboard/cliente");
        default:
          req.flash("message", "Invalid user role");
          return res.redirect("/login");
      }
    });
  })(req, res, next);
});

// Página de registro
router.post("/register", (req, res, next) => {
  passport.authenticate("signup", (err, user, info) => {
    if (err) {
      return next(err); // Handle unexpected errors
    }
    if (!user) {
      // If user creation fails, redirect with a flash message
      req.flash("message", info?.message || "User registration failed");
      return res.redirect("/login/signup");
    }
    // Automatically log in the user after successful registration (optional)
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Redirect to login or another route
      req.flash("message", "Registration successful! Please log in.");
      return res.redirect("/login");
    });
  })(req, res, next);
});

// Manejar el registro con passport
router.post(
  "/register",
  passport.authenticate("signup", {
    successRedirect: "/login", // Redirige al login después de un registro exitoso
    failureRedirect: "/login/signup",
    failureFlash: true,
  })
);

// Ruta de logout
router.get("/signout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Aplicar middleware de autenticación para las rutas de dashboard
router.use(authMiddleware);

// Otras rutas protegidas
// Aquí puedes definir rutas específicas para cada rol
// Por ejemplo:
// router.get("/dashboard/admin", isAuthenticated, (req, res) => {
//   res.render("adminDashboard", { user: req.user });
// });

// Exportar el router
export default router;
