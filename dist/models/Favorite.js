"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const favoriteSchema = new mongoose_1.default.Schema({
    movieName: { type: String, required: true },
    imgUrl: { type: String, required: true },
    movieID: { type: String, required: true },
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true }
});
exports.FavoriteModel = mongoose_1.default.model("Favorite", favoriteSchema);
