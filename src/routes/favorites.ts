import express from "express";
import { FavoriteModel } from "../models/Favorite";
import { authMiddleware } from "../middlewares/auth";
// import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/addToFavorites", authMiddleware, async (req, res) => {
  const { movieName, imgUrl, movieID } = req.body;
  const userID = (req as any).user._id;
  const favorite = new FavoriteModel({ movieName, imgUrl, movieID, userID });
  await favorite.save();
  res.status(201).json({ message: "Movie added to favorites", favorite });
});

router.get("/getFavorites", authMiddleware, async (req, res) => {
  const userID = (req as any).user._id;
  const favorites = await FavoriteModel.find({ userID });
  res.json({ message: "success", favorites });
});

export default router;