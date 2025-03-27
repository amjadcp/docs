// src/App.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import { Note } from './types/Note';

const App: React.FC = () => {
  // In the future you might fetch these from your Python backend
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Example useEffect to simulate fetching notes
  useEffect(() => {
    // TODO: Replace with an API call to your backend
    const initialNotes: Note[] = [
      {
        id: 1,
        title: 'Welcome Note',
        content: 'This is your first note. Click to edit!',
        version: 1,
        createdAt: new Date(),
      }
    ];
    setNotes(initialNotes);
    setSelectedNote(initialNotes[0]);
  }, []);

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now(), // simplistic unique id
      title: 'New Note',
      content: '',
      version: 1,
      createdAt: new Date(),
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNote(newNote);
  };

  const handleSaveNote = (updatedNote: Note) => {
    setNotes(prev =>
      prev.map(note => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar onNewNote={handleNewNote} />
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-gray-100 shadow">
          <h1 className="text-xl font-bold">Notes App</h1>
        </header>
        <main className="flex flex-1 overflow-hidden">
          <div className="w-1/3 border-r overflow-y-auto">
            <NoteList notes={notes} onSelectNote={handleSelectNote} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <NoteEditor note={selectedNote} onSave={handleSaveNote} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
