import { useEffect, useState } from "react";
import AddNotes from "../components/AddNotes";
import EditNoteModal from "../components/EditNotes";
import { notesService } from '../../lib/note.service';
import type { Note } from "../../lib/note.types";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      setIsLoading(true);
      const data = await notesService.getAll();
      const notesData = data.notes as Note[];
      console.log(data);
      setNotes(notesData);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (title: string, content: string) => {
    try {
      setIsLoading(true);
      const newNote = await notesService.create({ title, content });
      setNotes([newNote, ...notes]);
    } catch (error) {
      console.error('Failed to create note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNote = (id: string) => {
    const note = notes.find((n) => n._id === id);
    if (note) setEditingNote(note);
  };

  const handleSaveEdit = async (id: string, title: string, content: string) => {
    try {
      await notesService.update(id, { title, content });
      setNotes((prev) =>
        prev.map((note) =>
          note._id === id ? { ...note, title, content, updatedAt: new Date().toISOString() } : note
        )
      );
      setEditingNote(null);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await notesService.delete(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };
  return (
    <div className="min-h-screen  from-slate-950 via-slate-900 to-slate-950 text-slate-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <header className="mb-12 text-center animate-fade-in">
          <div className="inline-block">
            <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
              My Notes
            </h1>
            <div className="h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="mt-6 text-lg text-slate-400 font-light">
            Capture your thoughts and ideas — effortlessly ✨
          </p>
        </header>

        {/* Add Note Form */}
        <div className="mb-10">
          <AddNotes onAddNote={handleAddNote} isLoading={isLoading} />
        </div>

        {/* Notes Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-100">
              All Notes{" "}
              <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                {notes.length}
              </span>
            </h2>
          </div>

          {isLoading && notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-slate-400">Loading notes...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-16 shadow-inner">
              <svg
                className="mx-auto h-14 w-14 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-5 text-xl font-medium text-slate-200">
                No notes yet
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Start by adding your first note above!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note, index) => (
                <div
                  key={note._id}
                  className="group relative rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900/90 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/60 backdrop-blur-sm animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-slate-100 line-clamp-1 group-hover:text-blue-400 transition-colors duration-300">
                      {note.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-400 line-clamp-4 leading-relaxed">
                      {note.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-700/50">
                    <time className="font-medium">{note.createdAt}</time>
                    <div className="flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
                      <button
                        onClick={() => handleEditNote(note._id)}
                        className="rounded-lg p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-200 hover:scale-110"
                        title="Edit note"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note._id)}
                        className="rounded-lg p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200 hover:scale-110"
                        title="Delete note"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Edit Modal */}
        {editingNote && (
          <EditNoteModal
            note={editingNote}
            onSave={handleSaveEdit}
            onClose={() => setEditingNote(null)}
          />
        )}
      </div>
    </div>
  );
}
