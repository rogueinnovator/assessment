"use client";

import type React from "react";

import { useState } from "react";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
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
      onSave(note._id, title, content);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 shadow-2xl shadow-blue-500/10 animate-slide-up">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-100">Edit Note</h2>
          </div>
          <p className="ml-7 text-sm text-slate-400">Make changes to your note</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="edit-title" className="block text-base font-bold text-slate-200 mb-3">
              Title
            </label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-lg rounded-xl border-2 border-slate-600 bg-slate-900/80 px-6 py-4 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 hover:border-slate-500"
              placeholder="Enter note title"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-content" className="block text-base font-bold text-slate-200 mb-3">
              Content
            </label>
            <textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full text-lg rounded-xl border-2 border-slate-600 bg-slate-900/80 px-6 py-4 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 resize-none hover:border-slate-500 leading-relaxed"
              placeholder="Enter note content"
              required
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border-2 border-slate-600 bg-slate-900 px-8 py-4 text-base font-bold text-slate-300 transition-all duration-200 hover:bg-slate-700 hover:border-slate-500 hover:-translate-y-0.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

