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
const Note_1 = require("../models/Note");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/addNote", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, desc } = req.body;
    const userID = req.user._id;
    const note = new Note_1.NoteModel({ title, desc, userID });
    yield note.save();
    res.status(201).json({ message: "Note added", note });
}));
router.get("/getUserNotes", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user._id;
    const notes = yield Note_1.NoteModel.find({ userID });
    res.json({ message: "success", notes });
}));
router.delete("/deleteNote", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { NoteID } = req.body;
    yield Note_1.NoteModel.findByIdAndDelete(NoteID);
    res.json({ message: "Note deleted" });
}));
router.put("/updateNote", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, desc, userID } = req.body;
    const note = yield Note_1.NoteModel.findOneAndUpdate({ userID }, { title, desc }, { new: true });
    res.json({ message: "Note updated", note });
}));
exports.default = router;
