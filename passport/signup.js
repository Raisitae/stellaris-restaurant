import { Strategy as LocalStrategy } from "passport-local";
import User, { addUser } from "../models/User.js";
import { findOneController } from "../controllers/userControllers.js";
import pkg from "bcryptjs";
const { hashSync, genSaltSync } = pkg;

// Function to handle user creation and validation
const findOrCreateUser = async (req, username, password, user_type, done) => {
  try {
    // Check if the user already exists
    const user = await findOneController({ username: username });
    if (user) {
      console.log("User already exists with username: " + username);
      return done(null, false, req.flash("message", "User Already Exists"));
    } else {
      // If user doesn't exist, create a new user
      const newUser = await addUser(username, password, user_type);

      console.log("User Registration successful");

      return done(null, newUser); // Pass user to done callback
    }
  } catch (err) {
    console.log("Error in SignUp: " + err);
    return done(err); // If an error occurs, pass it to done
  }
};

export default function (passport) {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true, // This allows us to access req in the callback
      },
      async (req, username, password, done) => {
        const user_type = req.body.user_type; // Access user_type from the request body
        await findOrCreateUser(req, username, password, user_type, done); // Pass done to the function
      }
    )
  );
}
