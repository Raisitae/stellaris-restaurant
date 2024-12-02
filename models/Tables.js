import { ObjectId } from "mongodb";
import connectToDB from "../db/connection.js";

const COLLECTION_NAME = "tables";

// Get all tables
const getAllTables = async () => {
  const db = await connectToDB();
  return await db.collection(COLLECTION_NAME).find({}).toArray();
};

// Get all tables by ID
const getTablesById = async (_id) => {
  const db = await connectToDB();
  return await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(_id) });
};

// Get all tables by reservation ID
const getTablesByReservationId = async (reservationId) => {
  const db = await connectToDB();
  return await db
    .collection(COLLECTION_NAME)
    .findOne({ reservation_id: reservationId });
};

// Add a new table
const addTable = async (newTable) => {
  const db = await connectToDB();
  const result = await db.collection(COLLECTION_NAME).insertOne(newTable);
  return result; // Return the inserted document
};

// Update a table (or add it if missing)
const updateTable = async (id, updatedTable) => {
  const db = await connectToDB();
  const result = await db.collection(COLLECTION_NAME).findOneAndUpdate(
    { _id: new ObjectId(id) }, // Find table by ID
    { $set: updatedTable }, // Update table fields
    { returnDocument: "after", upsert: true } // `upsert: true` adds the table if it doesn't exist
  );
  return result; // Return the updated/inserted document
};

// Delete a table by ID
const deleteTable = async (id) => {
  const db = await connectToDB();
  const result = await db
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) });
  return result; // Return true if a document was deleted
};

export {
  getAllTables,
  addTable,
  getTablesByReservationId,
  getTablesById,
  updateTable,
  deleteTable,
};
