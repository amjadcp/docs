// src/components/NoteEditor.tsx
import React, { useState, useEffect } from 'react';
import { Note } from '../types/Note';

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Note) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSave = () => {
    if (!note) return;
    const updatedNote: Note = {
      ...note,
      title,
      content,
      version: (note.version || 1) + 1,
      updatedAt: new Date(),
    };
    // TODO: Make an API call to save the note in the backend if needed
    onSave(updatedNote);
  };

  if (!note) {
    return <div className="p-4 text-gray-500">Select or create a note to start editing</div>;
  }

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full p-3 border rounded mb-4 text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full p-3 border rounded mb-4 h-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
