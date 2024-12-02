import { Router } from "express";

import {
  getAllTablesController,
  updateTableController,
  getTableByIdController,
  deleteTableController,
} from "../controllers/tableControllers.js";

const router = Router();

// Rutas para las vistas PUG
// Ruta para ver todas las reservas
router.get("/all-tables", async (req, res) => {
  try {
    const tables = await getAllTablesController();

    res.render("tables/all-tables", {
      title: "Todas las mesas",
      tables,
    });
  } catch (error) {
    res.status(500).send("Error al obtener las mesas");
  }
});

// Ruta para ver una reserva en detalle
router.get("/detail-table/:_id", async (req, res) => {
  const { _id } = req.params;
  console.log(_id);

  try {
    const table = await getTableByIdController(_id); // Pass only the id
    console.log(table);

    if (table) {
      return res.render("tables/detail-table", {
        title: "Detalles de la Reserva",
        table,
      });
    } else {
      return res.status(404).send("Mesa no encontrada");
    }
  } catch (error) {
    console.error("Error fetching mesa:", error);
    return res.status(500).send(error.message);
  }
});

// Ruta para ir al formulario para cambiar una mesa
router.get("/update-table/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const table = await getTableByIdController(_id);
    if (table) {
      res.render("tables/update-table", {
        title: "Actualizar mesa",
        table,
      });
    } else {
      res.status(404).send("Mesa no encontrada");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error al obtener la mesa para actualización");
  }
});

// Ruta para procesar el cambio
// Entendemos que esta ruta debería ser PUT, pero como el formulario es de método POST, tuvimos que ponerlo así
router.post("/updated-table/:_id", async (req, res) => {
  const { _id } = req.params;
  const { capacity, occupied, reservation_id } = req.body;

  try {
    const updateTable = await updateTableController(_id, {
      capacity: parseInt(capacity),
      occupied: parseInt(occupied),
      reservation_id: reservation_id,
    });

    console.log(updateTable);
    if (updateTable) {
      console.log("Redirection to table details");
      return res.redirect(`/tables/detail-table/${_id}`);
    } else {
      return res.status(404).send("Mesa no encontrada");
    }
  } catch (error) {
    console.error("Error updating table:", error);
    return res.status(500).send("Error al actualizar la mesa");
  }
});

router.get("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const reservation = await deleteTableController(_id);
    if (reservation) {
      res.redirect("/");
    } else {
      res.status(404).send("Mesa no encontrada");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error al eliminar la mesa");
  }
});

export default router;
