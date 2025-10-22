import { useEffect, useState } from "react";
import AddNotes from "../components/AddNotes";
import EditNoteModal from "../components/EditNotes";
import { notesService } from '../../lib/note.service';
import type { Note } from "../../lib/note.types";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNote = (title: string, content: string) => {
    setIsLoading(true);
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setIsLoading(false);
  };
  useEffect(() => {
    getNotes();
  }, [notes.length]);
  const getNotes = async () => {
    const data = await notesService.getAll();
    setNotes(data.notes);
  };

  const handleEditNote = (id: string) => {
    const note = notes.find((n) => n._id === id);
    if (note) setEditingNote({ ...note, id });
  };

  const handleSaveEdit = (id: string, title: string, content: string) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) =>
          note._id === editingNote._id ? { ...note, title, content } : note
        )
      );
      console.log(id, title, content);

      notesService.update(id, { title, content });
      setEditingNote(null);
    }
  };

  const handleDeleteNote = (id: string) => {
    notesService.delete(id);
  };

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

  return (
    <div className="min-h-screen flex justify-center items-center from-background via-background/95 to-background/90 text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-primary drop-shadow-sm">
            My Notes
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Capture your thoughts and ideas — effortlessly ✨
          </p>
        </header>

        {/* Add Note Form */}
        <div className="mb-10">
          <AddNotes onAddNote={handleAddNote} isLoading={isLoading} />
        </div>

        {/* Notes Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              All Notes{" "}
              <span className="text-muted-foreground text-sm">
                ({notes.length})
              </span>
            </h2>
          </div>

          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-16 shadow-inner">
              <svg
                className="mx-auto h-14 w-14 text-muted-foreground/70"
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
              <h3 className="mt-5 text-xl font-medium text-foreground">
                No notes yet
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Start by adding your first note above!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="group relative rounded-2xl border border-border  from-card/90 to-card/70 p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl hover:border-primary/50"
                >
                  <div className="mb-5">
                    <h3 className="text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {note.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {note.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground/80">
                    {/* <time>{formatDate(note.createdAt)}</time> */}
                    <div className="flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <button
                        onClick={() => handleEditNote(note._id)}
                        className="rounded-md p-2  hover:bg-primary/10 transition-colors"
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
                        className="rounded-md p-2 text-red-500 hover:bg-red-500/10 transition-colors"
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
