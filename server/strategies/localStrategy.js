import { Strategy } from "passport-local";
import User from "../models/user.js";
import passport from "passport";
import { comparePassword } from "../configs/hashPassword.js";

export default passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      // passReqToCallback: true,
    },
    async (username, password, done) => {
      console.log("username", username, "password", password, "done", done);
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false);
      }
      if (comparePassword(password, user.password) === false) {
        return done("Password Wrong", null);
      }
      return done(null, user);
    }
  )
);
