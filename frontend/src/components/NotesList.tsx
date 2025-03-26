import React from 'react';
import { Note } from '../types/note';

interface NotesListProps {
    notes: Note[];
    onEditNote: (note: Note) => void;
    onDeleteNote: (noteId: number) => void;
}

export const NotesList: React.FC<NotesListProps> = ({ notes, onEditNote, onDeleteNote }) => {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
                <div key={note.id} className="p-4 border rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => onEditNote(note)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDeleteNote(note.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
