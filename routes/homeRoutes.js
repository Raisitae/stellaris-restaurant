import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Sistema de Reservas" });
});

export default router;
