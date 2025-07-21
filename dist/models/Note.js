"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true }
});
exports.NoteModel = mongoose_1.default.model("Note", noteSchema);
