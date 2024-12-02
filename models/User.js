import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import connectToDB from "../db/connection.js";
import pkg from "bcryptjs";
const { hashSync, genSaltSync } = pkg;

const COLLECTION_NAME = "users";

// Define the schema for users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  user_type: { type: String, required: true }, // New field for user type
});

// Create the model with the custom collection name
const User = mongoose.model("User", userSchema, COLLECTION_NAME);

const addUser = async (username, password, user_type) => {
  try {
    // Hash the password using bcryptjs
    const hashedPassword = createHash(password, genSaltSync(10));

    // Create a new user object
    const newUser = new User({
      username: username,
      password: hashedPassword,
      user_type: user_type, // Assuming user_type is passed as an argument
    });

    // Return the created user
    const db = await connectToDB();
    const result = await db.collection(COLLECTION_NAME).insertOne(newUser);
    console.log("User created successfully");
    // Get the inserted user from the result
    const insertedUser = await db
      .collection("users")
      .findOne({ _id: result.insertedId });

    // Log the inserted user
    console.log(insertedUser);

    // Return the inserted user
    return insertedUser; // Return the inserted user document
  } catch (err) {
    console.log("Error in createUser: ", err);
    throw err;
  }
};

const findOne = async (username) => {
  try {
    // Connect to the database
    const db = await connectToDB();

    // Search for the user by username
    const user = await db
      .collection(COLLECTION_NAME)
      .findOne({ username: username.username });

    // If the user is not found, return null or handle it as needed
    if (!user) {
      console.log(`No user found with username: ${username.username}`);
      return null;
    }

    return user;
  } catch (err) {
    console.error("Error while searching for user:", err);
    throw err; // Re-throw the error to be handled at the caller level
  }
};

const findById = async (_id) => {
  const db = await connectToDB();
  return await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(_id) });
};

// Password hashing function
const createHash = (password) => {
  return hashSync(password, genSaltSync(10));
};

export { findOne, findById, addUser };
export default User;
