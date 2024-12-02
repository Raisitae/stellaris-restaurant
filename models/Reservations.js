import { ObjectId } from "mongodb";
import connectToDB from "../db/connection.js";

const COLLECTION_NAME = "reservations";

// Obtener todas las reservas
const getAllReservations = async () => {
  const db = await connectToDB();
  return await db.collection(COLLECTION_NAME).find({}).toArray();
};

// Filter reservations by user's last name
const getReservationsByUserLastName = async (lastName) => {
  const db = await connectToDB();
  return await db
    .collection(COLLECTION_NAME)
    .find({ last_name: { $regex: new RegExp(`^${lastName}$`, "i") } })
    .toArray();
};

// Buscar una reserva por id
const getReservationById = async (id) => {
  console.log("Received ID:", id); // Log the ID
  const db = await connectToDB();

  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectId");
  }

  return await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });
};

// Agregar una nueva reserva
const addReservation = async (newReservation) => {
  const db = await connectToDB();
  const result = await db.collection(COLLECTION_NAME).insertOne(newReservation);
  // Include the inserted ID in the response
  return { ...newReservation, id: result.insertedId };
};

// Actualizar una reserva
const updateReservation = async (id, updatedReservation) => {
  const db = await connectToDB();
  const result = await db.collection(COLLECTION_NAME).findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updatedReservation },
    { returnDocument: "after" } // Devuelve el documento actualizado
  );

  return result; // Si no se encontró un documento "value" retorna null
};

// Eliminar una reserva
const deleteReservation = async (id) => {
  const db = await connectToDB();
  const result = await db
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0; // Returns true if a document was deleted
};

export {
  getAllReservations,
  getReservationsByUserLastName,
  getReservationById,
  addReservation,
  updateReservation,
  deleteReservation,
};
