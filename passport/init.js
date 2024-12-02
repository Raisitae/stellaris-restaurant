import { findByIdController } from "../controllers/userControllers.js";
import login from "./login.js";
import signup from "./signup.js";

export default function (passport) {
  passport.serializeUser(function (user, done) {
    //console.log("serializing user: ");
    console.log(user);
    done(null, user._id); // Store the user ID in session
  });

  passport.deserializeUser(function (id, done) {
    findByIdController(id)
      .then((user) => {
        // console.log("deserializing user:", user);
        done(null, user); // Attach the full user object to the session
      })
      .catch((err) => {
        console.error("Error deserializing user:", err);
        done(err);
      });
  });

  // Initialize login and signup strategies
  login(passport);
  signup(passport);
}
