"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Favorite_1 = require("../models/Favorite");
const auth_1 = require("../middlewares/auth");
// import { authMiddleware } from "../middlewares/auth";
const router = express_1.default.Router();
router.post("/addToFavorites", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieName, imgUrl, movieID } = req.body;
    const userID = req.user._id;
    const favorite = new Favorite_1.FavoriteModel({ movieName, imgUrl, movieID, userID });
    yield favorite.save();
    res.status(201).json({ message: "Movie added to favorites", favorite });
}));
router.get("/getFavorites", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user._id;
    const favorites = yield Favorite_1.FavoriteModel.find({ userID });
    res.json({ message: "success", favorites });
}));
exports.default = router;
