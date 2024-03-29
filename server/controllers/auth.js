import User from "../models/User.js";
import { hashPassword } from "../configs/hashPassword.js";
import passport from "passport";

export const login = async (req, res) => {
  console.log("login", req.body);
  passport.authenticate("local", (err, user) => {
    console.log("user", user, "err", err);
    if(req.isAuthenticated()){
      return res.status(200).json(req.user);
    }
    if (err) {
      return res.status(401).json({ message: err });
    }
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(401).json({ message: err });
      }
      return res.status(200).json(user);
    });
  })(req, res);
};

export const signup = async (req, res) => {
  const user = { ...req.body, password: hashPassword(req.body.password) };
  console.log(user);
  const new_user = await User.create(user);
  res.send(new_user);
};

export const logout = async (req, res) => {
  // "/logout",
  
  req.logout((err) => {
    if (err) {
      return res.status(401).json({ message: err });
    }
    return res.status(200).json({ message: "logged out" });
  });
};

// export const unathorized = async (req, res) => {
//   return res.status(401).json({ message: "unauthorized" });
// };
