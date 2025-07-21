import express from "express";
import { UserModel } from "../models/User";
import { generateToken } from "../utils/token";
import { authMiddleware } from "../middlewares/auth";
// import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;
  const exists = await UserModel.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const user = new UserModel({ first_name, last_name, email, password, age });
  await user.save();

  const token = generateToken(user.toObject());
  res.status(201).json({ message: "User created", token });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user.toObject());
  res.json({ message: "Login successful", token });
});

router.post("/signOut", authMiddleware, (req, res) => {
  res.json({ message: "SignOut successful (client should discard token)" });
});

router.get("/getAllUsers", authMiddleware, async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const users = await UserModel.find({}, { password: 0 }).skip(skip).limit(limit);
  res.json({ message: "success", page, users });
});

export default router;