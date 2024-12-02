import { Router } from "express";

import {
  getAllReservationsController,
  getFilteredReservationsController,
  createReservationController,
  updateReservationController,
  deleteReservationController,
  getReservationDetailController,
} from "../controllers/reservationController.js"; // Ensure the path is correct

const router = Router();

// Rutas para la api
// Ruta para traer todas las reservas
router.get("/", getAllReservationsController);

// Ruta para traer una reserva por ID
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const reservation = await getReservationDetailController(_id);

    if (reservation) {
      return res.json(reservation);
    } else {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res.status(500).json({ message: error.message });
  }
});

// Rura para filtrar las reservas por apellido
router.get("/last-name/:last_name", getFilteredReservationsController);

// Ruta para añadir una reserva
router.post("/", async (req, res) => {
  try {
    const reservation = await createReservationController(req); // Pass req to the controller
    return res.status(201).json(reservation); // Return the created reservation
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res.status(500).json({ message: error.message }); // Return error message
  }
});

// Ruta para actualizar una reserva
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const reservation = await updateReservationController(_id, req.body);
    if (reservation) {
      return res.json(reservation);
    } else {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res.status(500).json({ message: error.message });
  }
});

// Ruta para borrar una reserva
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const result = await deleteReservationController(_id);

    if (result) {
      res.status(204).end(); // 204 No Content
    } else {
      res.status(404).json({ message: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reserva" });
  }
});

export default router;
