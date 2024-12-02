import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

export default async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    db = client.db("StellarisRestoApp");

    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the app if connection fails
  }
}

export function getDB() {
  if (!db) throw new Error("Database not initialized");
  return db;
}
