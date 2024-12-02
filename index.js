import dotenv from "dotenv";
import express from "express";
import path from "path";
import session from "express-session";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import reservationRoutesViews from "./routes/reservationRoutesViews.js";
import reservationRoutesApi from "./routes/reservationRoutesApi.js";
import tableRoutesViews from "./routes/tableRoutesViews.js";
import tableRoutesApi from "./routes/tableRoutesApi.js";
import flash from "connect-flash";
import methodOverride from "method-override";
import crypto from "crypto";
import connectToDB from "./db/connection.js";
import initPassport from "./passport/init.js";
import passport from "passport";

const sessionSecret = crypto.randomBytes(64).toString("hex");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(flash());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Method Override middleware
app.use(methodOverride("_method"));

// Initialize Passport
initPassport(passport);
app.use(session({ secret: sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

// Pug template engine setup
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "views")); // Uses process.cwd() for the current path

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files from the "public" directory
app.use(express.static(path.join(process.cwd(), "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Stellaris Resto System" });
});

// Use authRoutes for login
app.use("/login", authRoutes);

// API routes without middleware protection
app.use("/api/reservations", reservationRoutesApi);
app.use("/api/tables", tableRoutesApi);

// Protected Routes
app.use("/dashboard", authMiddleware, dashboardRoutes);
app.use("/reservations", authMiddleware, reservationRoutesViews);
app.use("/tables", authMiddleware, tableRoutesViews);

// Page 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Página no encontrada" });
});

// Start the server after database connection
(async () => {
  try {
    await connectToDB(); // Connect to the database
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
})();
