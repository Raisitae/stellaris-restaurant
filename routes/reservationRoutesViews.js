import { Router } from "express";

import {
  getAllReservationsController,
  getReservationDetailController,
  createReservationController,
  updateReservationController,
  deleteReservationController,
  getFilteredReservationsController,
  getFilteredReservationsControllerView,
} from "../controllers/reservationController.js";

const router = Router();

// Rutas para las vistas PUG
// Ruta para ver todas las reservas
router.get("/all-reservations", async (req, res) => {
  try {
    const reservations = await getAllReservationsController();

    res.render("reservations/all-reservations", {
      title: "Todas las Reservas",
      reservations,
    });
  } catch (error) {
    res.status(500).send("Error al obtener las reservas");
  }
});

// Ruta para ver una reserva en detalle
router.get("/client-last-name", async (req, res) => {
  return res.render("reservations/client-last-name", {
    title: "Detalles de la Reservas",
  });
});

router.get("/last-name/:last_name", async (req, res) => {
  const { last_name } = req.params;
  console.log("Searching for reservations with last name:", last_name);

  try {
    const reservations = await getFilteredReservationsControllerView(last_name);

    if (reservations && reservations.length > 0) {
      return res.render("reservations/last-name-list", {
        title: "Detalles de las Reservas",
        reservations,
      });
    } else {
      return res
        .status(404)
        .send("No se encontraron reservas con ese apellido");
    }
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).send("Error al buscar las reservas");
  }
});

// Ruta para ver una reserva en detalle
router.get("/detail-reservation/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const reservation = await getReservationDetailController(_id); // Pass only the id

    if (reservation) {
      return res.render("reservations/detail-reservation", {
        title: "Detalles de la Reserva",
        reservation,
      });
    } else {
      return res.status(404).send("Reserva no encontrada");
    }
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res.status(500).send(error.message);
  }
});

// Ruta para ir al formulario para crear una reserva
router.get("/new", async (req, res) => {
  res.render("reservations/new", {
    title: "Nueva Reserva",
  });
});

// Ruta para procesar el envio del formulario de creacion
router.post("/created", async (req, res) => {
  try {
    const reservation = await createReservationController(req, res);
    if (reservation) {
      res.render("reservations/detail-reservation", {
        title: "Reserva creada",
        reservation: reservation.data,
      });
    } else {
      res.status(404).send("Reserva no creada");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error al obtener crear la reserva");
  }
});

// Ruta para ir al formulario para cambiar una reserva
router.get("/update-reservation/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const reservation = await getReservationDetailController(_id);
    if (reservation) {
      res.render("reservations/update-reservation", {
        title: "Actualizar Reserva",
        reservation,
      });
    } else {
      res.status(404).send("Reserva no encontrada");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error al obtener la reserva para actualización");
  }
});

// Ruta para procesar el cambio
// Entendemos que esta ruta debería ser PUT, pero como el formulario es de método POST, tuvimos que ponerlo así
router.post("/updated-reservation/:_id", async (req, res) => {
  const { _id } = req.params;
  const { last_name, date, hour, guests, status } = req.body;

  try {
    const updatedReservation = await updateReservationController(_id, {
      last_name,
      date,
      hour,
      guests,
      status,
    });

    if (updatedReservation) {
      console.log("Redirection to reservation details");
      return res.redirect(`/reservations/detail-reservation/${_id}`);
    } else {
      return res.status(404).send("Reserva no encontrada");
    }
  } catch (error) {
    console.error("Error updating reservation:", error);
    return res.status(500).send("Error al actualizar la reserva");
  }
});

// Ruta para procesar el delete
// Entendemos que esta ruta debería ser DELETE, pero la esta redireccionando un href
router.get("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const reservation = await deleteReservationController(_id);
    if (reservation) {
      res.redirect("/");
    } else {
      res.status(404).send("Reserva no encontrada");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error al eliminar la reserva");
  }
});

export default router;
