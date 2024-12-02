import { Router } from "express";

import {
  getAllTablesController,
  createTableController,
  updateTableController,
  getTableByIdController,
  deleteTableController,
} from "../controllers/tableControllers.js"; // Ensure the path is correct

const router = Router();

// Rutas para la api
// Ruta para traer todas las mesas
router.get("/", getAllTablesController);

// Ruta para traer una mesa por ID
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const table = await getTableByIdController(_id);

    if (table) {
      return res.json(table);
    } else {
      return res.status(404).json({ message: "Mesa no encontrada" });
    }
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res.status(500).json({ message: error.message });
  }
});

// Ruta para añadir una mesa
router.post("/", async (req, res) => {
  try {
    const mesa = await createTableController(req); // Pass req to the controller
    return res.status(201).json(mesa); // Return the created table
  } catch (error) {
    console.error("Error creating mesa:", error);
    return res.status(500).json({ message: error.message }); // Return error message
  }
});

// Ruta para actualizar una reserva
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const table = await updateTableController(_id, req.body);
    if (table) {
      return res.json(table);
    } else {
      return res.status(404).json({ message: "Mesa no encontrada" });
    }
  } catch (error) {
    console.error("Error fetching table:", error);
    return res.status(500).json({ message: error.message });
  }
});

// Ruta para borrar una reserva
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const result = await deleteTableController(_id);

    if (result) {
      res.status(204).end(); // 204 No Content
    } else {
      res.status(404).json({ message: "Mesa no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la mesa" });
  }
});

export default router;
