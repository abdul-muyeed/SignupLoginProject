import User from "../models/user.js";
import { hashPassword } from "../configs/hashPassword.js";
import passport from "passport";
import CryptoJS from "crypto-js";
import { sendMail } from "../configs/SendMail.js";

export const login = async (req, res) => {
  console.log("login", req.body);
  passport.authenticate("local", (err, user) => {
    console.log("user", user, "err", err);
    if (req.isAuthenticated()) {
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

export const forgotPassword = async (req, res) => {
  const token = CryptoJS.AES.encrypt(
    JSON.stringify({ email: req.body.email }),
    process.env.SESSION_SECRET
  ).toString();
  console.log("forgot password", req.body);

  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        verification_code: {
          token: token,
          expire: Date.now() + 10 * 60 * 1000,
        },
      },
    },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  await sendMail(req.body.email, token, "resetPassword");

  return res.status(200).json(user);
};

export const resetPassword = async (req, res) => {
  try {
    console.log("reset password", req.body);
    const bytes = CryptoJS.AES.decrypt(
      req.body.token,
      process.env.SESSION_SECRET
    );
    const token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const user = await User.findOne({ email: token.email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.verification_code.expire < Date.now()) {
      return res.status(401).json({ message: "token expired" });
    }
    user.password = hashPassword(req.body.password);
    user.verification_code.expire = Date.now();
    await user.save();
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const verifyMail = async (req, res) => {
  const token = CryptoJS.AES.encrypt(
    JSON.stringify({ id: req.body.id }),
    process.env.SESSION_SECRET
  ).toString();
  const user = await User.findByIdAndUpdate(req.body.id, {
    $set: {
      verification_code: {
        token: token,
        expire: Date.now() + 10 * 60 * 1000,
      },
    },
  });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  await sendMail(req.body.email, token, "verifyEmail");

  return res.status(200).json(user);
};

export const verification = async (req, res) => {
  try {
    console.log("verification", req.body);
    const bytes = CryptoJS.AES.decrypt(
      req.body.token,
      process.env.SESSION_SECRET
    );
    const token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const user = await User.findById(token.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.verification_code.expire < Date.now()) {
      return res.status(401).json({ message: "token expired" });
    }
    user.verified = true;
    user.verification_code.expire = Date.now();
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// export const unathorized = async (req, res) => {
//   return res.status(401).json({ message: "unauthorized" });
// };
