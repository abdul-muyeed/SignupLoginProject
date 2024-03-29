import express from "express";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import { MongoDB } from "./configs/DBconnect.js";
import bodyParser from "body-parser";
import "./strategies/localStrategy.js";
import AuthRouter from "./routes/auth.js";
import UserRouter from "./routes/user.js";
import User from "./models/User.js"; 
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser((user, done) => {
  console.log("serialize user", user.id);
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  console.log("deserialize user", user);
  done(null, user);
});

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
    `<a href="http://localhost:5000/auth/google">please goto /auth/google to login</a>
    <a href="http://localhost:5000/auth/local">please goto /auth/local to login</a>`
  );
});

// app.post("/auth/local",  (req, res) => {
//   res.send("logged in");
// });

// app.get("/profile", (req, res) => {
//   if (req.isAuthenticated()) {
//     return res.status(200).json({ message: "authenticated" });
//   } else {
//     console.log("not authenticated");
//     return res.status(401).json({ message: "unauthorized" });
//     // res.redirect("/");
//   }
// });
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
// app.use('/user',)
// app.get("/logout", (req, res) => {
// });

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
MongoDB();
