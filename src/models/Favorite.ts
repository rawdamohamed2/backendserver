import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  imgUrl: { type: String, required: true },
  movieID: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export const FavoriteModel = mongoose.model("Favorite", favoriteSchema);