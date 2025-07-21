import express from "express";
import { NoteModel } from "../models/Note";
import { authMiddleware } from "../middlewares/auth";


const router = express.Router();

router.post("/addNote",authMiddleware , async (req, res) => {
  const { title, desc } = req.body;
  const userID = (req as any).user._id;
  const note = new NoteModel({ title, desc, userID });
  await note.save();
  res.status(201).json({ message: "Note added", note });
});

router.get("/getUserNotes", authMiddleware, async (req, res) => {
  const userID = (req as any).user._id;
  const notes = await NoteModel.find({ userID });
  res.json({ message: "success", notes });
});

router.delete("/deleteNote", authMiddleware, async (req, res) => {
  const { NoteID } = req.body;
  await NoteModel.findByIdAndDelete(NoteID);
  res.json({ message: "Note deleted" });
});

router.put("/updateNote", authMiddleware, async (req, res) => {
  const { title, desc, userID } = req.body;
  const note = await NoteModel.findOneAndUpdate({ userID }, { title, desc }, { new: true });
  res.json({ message: "Note updated", note });
});

export default router;
