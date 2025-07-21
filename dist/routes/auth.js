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
const User_1 = require("../models/User");
const token_1 = require("../utils/token");
const auth_1 = require("../middlewares/auth");
// import { authMiddleware } from "../middlewares/auth";
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password, age } = req.body;
    const exists = yield User_1.UserModel.findOne({ email });
    if (exists)
        return res.status(400).json({ message: "Email already exists" });
    const user = new User_1.UserModel({ first_name, last_name, email, password, age });
    yield user.save();
    const token = (0, token_1.generateToken)(user.toObject());
    res.status(201).json({ message: "User created", token });
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.UserModel.findOne({ email, password });
    if (!user)
        return res.status(401).json({ message: "Invalid credentials" });
    const token = (0, token_1.generateToken)(user.toObject());
    res.json({ message: "Login successful", token });
}));
router.post("/signOut", auth_1.authMiddleware, (req, res) => {
    res.json({ message: "SignOut successful (client should discard token)" });
});
router.get("/getAllUsers", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const users = yield User_1.UserModel.find({}, { password: 0 }).skip(skip).limit(limit);
    res.json({ message: "success", page, users });
}));
exports.default = router;
