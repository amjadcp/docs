// src/components/NoteList.tsx
import React from 'react';
import { Note } from '../types/Note';

interface NoteListProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onSelectNote }) => {
  return (
    <div className="p-4 space-y-2">
      {notes.map(note => (
        <div
          key={note.id}
          className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
          onClick={() => onSelectNote(note)}
        >
          <h3 className="font-bold text-lg">{note.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
