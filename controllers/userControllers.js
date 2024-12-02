import { findOne, findById, addUser } from "../models/User.js";
import User from "../models/User.js";
import pkg from "bcryptjs";
const { hashSync, genSaltSync } = pkg;

const findOneController = async (username) => {
  try {
    console.log("Finding user with username:", username); // Add logging
    const user = await findOne(username);
    if (!user) {
      console.log("User not found with criteria:", username);
      return null;
    }
    return user;
  } catch (err) {
    console.error("Error al buscar el usuario:", err);
    throw err;
  }
};

const findByIdController = async (_id) => {
  try {
    const user = await findById(_id);
    if (!user) {
      console.log(`Usuario no encontrado con ID: ${_id}`);
      return null;
    }
    return user;
  } catch (error) {
    console.error(`Error al buscar usuario por ID: ${_id}`, error);
    throw error;
  }
};

const createUserController = async (req, res) => {
  const { username, password, user_type, confirm_password } = req.body;

  // Simple validation for matching passwords
  if (password !== confirm_password) {
    console.log("Passwords do not match");
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Call addUser function to add the user to the database
    const newUser = await addUser(username, password, user_type);

    // Return success response
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error while creating the user:", error);
    return res.status(500).json({ message: "Error while creating the user" });
  }
};

export { findOneController, findByIdController, createUserController };
