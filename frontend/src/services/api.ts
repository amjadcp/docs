import { Note } from '../types/note';

declare global {
    interface Window {
        pywebview: {
            api: {
                get_notes: () => Promise<Note[]>;
                create_note: (title: string, content: string) => Promise<Note>;
                update_note: (noteId: number, title: string, content: string) => Promise<boolean>;
                delete_note: (noteId: number) => Promise<boolean>;
            };
        };
    }
}

export const api = {
    getNotes: () => window.pywebview.api.get_notes(),
    createNote: (title: string, content: string) => window.pywebview.api.create_note(title, content),
    updateNote: (noteId: number, title: string, content: string) => window.pywebview.api.update_note(noteId, title, content),
    deleteNote: (noteId: number) => window.pywebview.api.delete_note(noteId)
};
