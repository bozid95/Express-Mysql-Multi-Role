import Users from "../models/UserModel.js";
import argon2 from "argon2";
import session from "express-session";

export const login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const matchPassword = await argon2.verify(user.password, req.body.password);
  if (!matchPassword) return res.status(400).json({ msg: "Wrong password" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ msg: "Login success", uuid, name, email, role });
};

export const me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ msg: "Authorized", uuid, name, email, role });
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: err.message });
    res.status(200).json({ msg: "Logout success" });
  });
};
