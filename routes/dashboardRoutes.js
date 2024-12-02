// routes/dashboardRoutes.js
import { Router } from "express";
const router = Router();

// Admin Dashboard
router.get("/admin", (req, res) => {
  res.render("dashboard/admin", {
    title: "Admin Dashboard",
    userRole: req.userRole,
  });
});

// Empleado Dashboard
router.get("/empleado", (req, res) => {
  res.render("dashboard/empleado", {
    title: "Empleado Dashboard",
    userRole: req.userRole,
  });
});

// Cliente Dashboard
router.get("/cliente", (req, res) => {
  res.render("dashboard/cliente", {
    title: "Cliente Dashboard",
    userRole: req.userRole,
  });
});

export default router;
