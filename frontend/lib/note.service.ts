import type { Note, CreateNoteDTO, UpdateNoteDTO } from "./note.types";

const BASE_URL = "http://localhost:3000/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }
  return res.json() as Promise<T>;
}

export const notesService = {
  async getAll(): Promise<Note[]> {
    const res = await fetch(`${BASE_URL}/notes`);
    return handleResponse<Note[]>(res);
  },

  async getById(id: string): Promise<Note> {
    const res = await fetch(`${BASE_URL}/notes/${id}`);
    return handleResponse<Note>(res);
  },

  async create(data: CreateNoteDTO): Promise<Note> {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Note>(res);
  },

  async update(id: string, data: UpdateNoteDTO): Promise<Note> {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Note>(res);
  },

  async delete(id: string): Promise<{ message: string }> {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    return handleResponse<{ message: string }>(res);
  },
};
