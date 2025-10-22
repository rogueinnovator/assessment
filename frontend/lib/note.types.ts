export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteDTO {
  title: string;
  content: string;
}

export interface UpdateNoteDTO {
  title?: string;
  content?: string;
}
