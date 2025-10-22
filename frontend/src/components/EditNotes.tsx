"use client";

import type React from "react";

import { useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface EditNoteModalProps {
  note: Note;
  onSave: (id: string, title: string, content: string) => void;
  onClose: () => void;
}

export default function EditNoteModal({ note, onSave, onClose }: EditNoteModalProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave(note.id, title, content);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl bg-card border border-border p-6 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Edit Note</h2>
          <p className="mt-1 text-sm text-muted-foreground">Make changes to your note</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-semibold text-foreground mb-2">
              Title
            </label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Enter note title"
            />
          </div>
          <div>
            <label htmlFor="edit-content" className="block text-sm font-semibold text-foreground mb-2">
              Content
            </label>
            <textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              placeholder="Enter note content"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:border-muted-foreground/30"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

