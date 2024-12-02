import { Strategy as LocalStrategy } from "passport-local";
import { findOneController } from "../controllers/userControllers.js";
import pkg from "bcryptjs";
const { compareSync } = pkg;

export default function (passport) {
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "username", // Explicitly define the username field
        passwordField: "password", // Explicitly define the password field
        passReqToCallback: true, // Allow access to the req object
      },
      async function (req, username, password, done) {
        try {
          // Fetch the user from the database
          const user = await findOneController({ username: username });

          if (!user) {
            console.log("User Not Found with username " + username);
            return done(null, false, req.flash("message", "User not found.")); // Flash message for user not found
          }

          // Validate the password
          console.log(user);
          if (!isValidPassword(user, password)) {
            console.log("Invalid Password for username " + username);
            return done(null, false, req.flash("message", "Invalid Password")); // Flash message for invalid password
          }

          // If the user exists and password is valid, proceed
          return done(null, user);
        } catch (err) {
          console.error("Error in login: ", err);
          return done(err); // Pass the error to the next handler
        }
      }
    )
  );

  // Password validation function
  var isValidPassword = function (user, password) {
    console.log(compareSync(password, user.password));
    return compareSync(password, user.password); // Compare the hashed password
  };
}
