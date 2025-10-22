
import type React from "react";
import { useState } from "react";
import { notesService } from "../../lib/note.service";

interface AddNoteFormProps {
  onAddNote: (title: string, content: string) => void;
  isLoading: boolean;
}

export default function AddNotes({ onAddNote, isLoading }: AddNoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      notesService.create({ title, content });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-foreground">Add New Note</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-foreground">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content"
            rows={4}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
        >
          Add Note
        </button>
      </div>
    </form>
  );
}

