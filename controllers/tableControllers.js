import {
  getAllTables,
  addTable,
  updateTable,
  getTablesByReservationId,
  getTablesById,
  deleteTable,
} from "../models/Tables.js";

// Obtener todas las mesas
const getAllTablesController = async (req, res) => {
  try {
    const tables = await getAllTables(); // Esperamos la llamada asíncrona
    if (res) {
      return res.json(tables);
    }
    return tables;
  } catch (error) {
    console.error("Error al obtener las mesas:", error);
    res.status(500).send("Error al obtener las mesas");
  }
};

// Obtener una mesa por id de reserva
const getTableByReservationIdController = async (id_reserva) => {
  try {
    const table = await getTablesByReservationId(id_reserva); // Esperamos la llamada asíncrona
    return table;
  } catch (error) {
    console.error("Error al obtener la mesa:", error);
    throw new Error("Error al obtener la mesa"); // Throw an error for handling in the route
  }
};

// Obtener una mesa por _id
const getTableByIdController = async (_id) => {
  try {
    const table = await getTablesById(_id); // Esperamos la llamada asíncrona
    return table;
  } catch (error) {
    console.error("Error al obtener la mesa:", error);
    throw new Error("Error al obtener la mesa"); // Throw an error for handling in the route
  }
};

// Crear una nueva mesa
const createTableController = async (req, res) => {
  const newTable = req.body;

  try {
    const createdTable = await addTable(newTable); // Esperamos la llamada asíncrona
    return { status: 201, data: createdTable };
  } catch (error) {
    console.error("Error al crear la mesa:", error);
    return res.status(500).json({ message: "Error al crear la mesa" });
  }
};

// Actualizar una mesa existente
const updateTableController = async (_id, body) => {
  try {
    const result = await updateTable(_id, body);
    return result;
  } catch (error) {
    throw new Error("Error al actualizar la reserva");
  }
};

// Eliminar una mesa por _id
const deleteTableController = async (_id) => {
  try {
    const result = await deleteTable(_id);
    return result;
  } catch (error) {
    throw error;
  }
};

export {
  getAllTablesController,
  createTableController,
  updateTableController,
  getTableByReservationIdController,
  getTableByIdController,
  deleteTableController,
};
