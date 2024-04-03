import User from "../models/user.js";
import { hashPassword } from "../configs/hashPassword.js";
import passport from "passport";
import CryptoJS from "crypto-js";
import { sendMail } from "../configs/SendMail.js";

export const login = async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user) => {
      if (req.isAuthenticated()) {
        return next({ message: "Already logged in", status: 406 });
      }
      if (err) {
        return next(err);
      }
      if (!user) {
        return next({ message: "User not found", status: 401 });
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json(user);
      });
    })(req, res, next);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export const signup = async (req, res, next) => {
  try {
    const user = { ...req.body, password: hashPassword(req.body.password) };
    const existing_user = await User.findOne({ email: user.email });
    if (existing_user) {
      return next({ message: "User already exists", status: 406 });
    }

    const new_user = await User.create(user);
    res.status(200).json(new_user);
  } catch (err) {
    return next(err);
  }
};

export const logout = async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return next({ message: err, status: 401 });
      }
      return res.status(200).json({ message: "logged out" });
    });
  } catch (err) {
    return next(err);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const token = CryptoJS.AES.encrypt(
      JSON.stringify({ email: req.body.email }),
      process.env.SESSION_SECRET
    ).toString();

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
      return next({ message: "User not found", status: 404 });
    }
    await sendMail(req.body.email, token, "resetPassword");

    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
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
      return next({ message: "user not found", status: 404 });
    }
    if (user.verification_code.expire < Date.now()) {
      return next({ message: "token expired", status: 401 });
    }
    user.password = hashPassword(req.body.password);
    user.verification_code.expire = Date.now();
    await user.save();
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

export const verifyMail = async (req, res) => {
  try {
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
      return next({ message: "User not found", status: 404 });
    }
    await sendMail(req.body.email, token, "verifyEmail");

    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
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
      return next({ message: "user not found", status: 404 });
    }
    if (user.verification_code.expire < Date.now()) {
      return next({ message: "token expired", status: 401 });
    }
    user.verified = true;
    user.verification_code.expire = Date.now();
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};
