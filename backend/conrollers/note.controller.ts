import { Request, Response } from "express";
import { Note } from "../models/note.model";
// GET all notes
export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single note by ID
export const getNoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ success: false, message: "Note not found" });
      return;
    }
    res.status(200).json({ success: true, note });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE a new note
export const createNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content } = req.body;

    if (!title || title.trim() === "") {
      res.status(400).json({ success: false, message: "Title is required" });
      return;
    }

    const newNote = new Note({ title, content });
    await newNote.save();

    res.status(201).json({ success: true, note: newNote });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE a note
export const updateNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      res.status(404).json({ success: false, message: "Note not found" });
      return;
    }

    res.status(200).json({ success: true, note: updatedNote });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE a note
export const deleteNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      res.status(404).json({ success: false, message: "Note not found" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
