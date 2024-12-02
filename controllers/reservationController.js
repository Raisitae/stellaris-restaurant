import {
  getAllReservations,
  getReservationsByUserLastName,
  getReservationById,
  addReservation,
  updateReservation,
  deleteReservation,
} from "../models/Reservations.js";

// Controlador para obtener todas las reservas
const getAllReservationsController = async (req, res) => {
  try {
    const reservations = await getAllReservations(); // Await the promise

    // Ensure reservations is defined and is an array or object
    if (
      reservations === undefined ||
      (Array.isArray(reservations) && reservations.length === 0)
    ) {
      console.log("No reservations found");
      return res.status(404).json({ message: "No reservations found" });
    }

    if (res) {
      return res.json(reservations);
    }
    return reservations;
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error al obtener las reservas" });
  }
};

// Controlador para filtrar reservas por apellido
const getFilteredReservationsController = async (req, res) => {
  const { last_name } = req.params;

  try {
    const filteredReservations = await getReservationsByUserLastName(last_name); // Await the promise
    if (filteredReservations.length === 0) {
      res.status(404).json({ message: "Reserva no encontrada" });
    } else {
      res.json(filteredReservations);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al filtrar reserva: " + error.message });
  }
};

// Controlador para filtrar reservas por apellido
const getFilteredReservationsControllerView = async (last_name) => {
  try {
    const filteredReservations = await getReservationsByUserLastName(last_name); // Await the promise
    if (filteredReservations.length === 0) {
      return null; // No reservations found
    } else {
      return filteredReservations; // Return the filtered reservations
    }
  } catch (error) {
    throw new Error("Error al filtrar reserva: " + error.message);
  }
};

// Controlador para ver el detalle de una reserva específica por id
const getReservationDetailController = async (_id) => {
  try {
    const reservation = await getReservationById(_id); // Await the promise
    return reservation; // Return the reservation or null
  } catch (error) {
    console.error("Error al obtener la reserva:", error);
    throw new Error("Error al obtener la reserva"); // Throw an error for handling in the route
  }
};

// Controlador para crear una nueva reserva
const createReservationController = async (req, res) => {
  const newReservation = req.body;
  try {
    const createdReservation = await addReservation(newReservation);
    return { status: 201, data: createdReservation };
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    return res.status(500).json({ message: "Error al crear la reserva" });
  }
};

const updateReservationController = async (_id, body) => {
  try {
    const result = await updateReservation(_id, body);
    return result;
  } catch (error) {
    throw new Error("Error al actualizar la reserva");
  }
};

// Controlador para eliminar una reserva
const deleteReservationController = async (_id) => {
  try {
    const result = await deleteReservation(_id);
    return result;
  } catch (error) {
    throw error;
  }
};

export {
  getAllReservationsController,
  getFilteredReservationsController,
  getReservationDetailController,
  createReservationController,
  updateReservationController,
  deleteReservationController,
  getFilteredReservationsControllerView,
};
