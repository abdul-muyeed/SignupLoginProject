import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import dotenv from "dotenv";
import { MongoDB } from "./DBconnect.js";
import User from "./models/User.js";
import bodyParser from "body-parser";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log("profile", profile);
//       done(null, profile);
//     }
//   )
// );
passport.serializeUser((user, done) => {
  console.log("serialize user", user);
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log("deserialize user", user);
  done(null, user);
});
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ name: username });
        if (!user) {
          const new_user = await User.create({ email: username, password: password });
          console.log("new_user", new_user);
          return done(null, new_user);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  // console.log("req.user", req);
  res.send(
    `<a href="http://localhost:5000/auth/google">please goto /auth/google to login</a>`
  );
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  console.log("req.user", req.user);
  res.redirect("/profile");
});

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("/profile");
//   }
// );

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(JSON.stringify(req.user, null, 2));
  } else {
    console.log("not authenticated");
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.listen(PORT, () => {
  //   log("Server is running on http://localhost:3000");
  console.log(`Server is running on http://localhost:${PORT}`);
});
MongoDB();
