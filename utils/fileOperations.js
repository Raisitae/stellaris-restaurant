import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Leer información desde JSON
export const readData = (filePath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const fullPath = join(__dirname, "..", filePath);

  // Revisa si el archivo existe
  if (!existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  try {
    const data = readFileSync(fullPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
};

// Escribir información en JSON
export const writeData = (filePath, data) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const fullPath = join(__dirname, "..", filePath);

  try {
    writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    throw new Error(`Error writing to file: ${error.message}`);
  }
};
