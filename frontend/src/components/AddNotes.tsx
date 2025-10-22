
import type React from "react";
import { useState } from "react";

interface AddNoteFormProps {
  onAddNote: (title: string, content: string) => void;
  isLoading: boolean;
}

export default function AddNotes({ onAddNote, isLoading }: AddNoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      await onAddNote(title, content);
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10 rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 shadow-2xl hover:border-slate-600 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
        <h2 className="text-2xl font-bold text-slate-100">Add New Note</h2>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-base font-bold text-slate-200 mb-3">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="TITLE"
            className="w-full text-lg rounded-xl border-2 border-slate-600 bg-slate-900/80 px-6 py-10 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 hover:border-slate-500"
            disabled={isLoading}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-base font-bold text-slate-200 mb-3">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={6}
            className="w-full text-lg rounded-xl border-2 border-slate-600 bg-slate-900/80 px-6 py-4 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 resize-none hover:border-slate-500 leading-relaxed"
            disabled={isLoading}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !title.trim() || !content.trim()}
          className="w-full sm:w-auto px-10 py-4 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Note
            </span>
          )}
        </button>
      </div>
    </form>
  );
}

