import mongoose, { Schema, Document, Model } from "mongoose";

export interface INote {
  title: string;
  content: string;
}

export interface INoteDocument extends INote, Document {}
export interface INoteModel extends Model<INoteDocument> {}

const NoteSchema = new Schema<INoteDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);
// Create and export the model
export const Note =
  (mongoose.models.Note as INoteModel) ||
  mongoose.model<INote>("Note", NoteSchema);
export default Note;
