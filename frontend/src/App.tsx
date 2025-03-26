import { useState, useEffect } from 'react';
import { Note } from './types/note';
import { api } from './services/api';
import { NotesList } from './components/NotesList';
import { NoteEditor } from './components/NoteEditor';

function App() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | undefined>();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            const fetchedNotes = await api.getNotes();
            setNotes(fetchedNotes);
        } catch (error) {
            console.error('Error loading notes:', error);
        }
    };

    const handleAddNote = () => {
        setSelectedNote(undefined);
        setIsEditing(true);
    };

    const handleEditNote = (note: Note) => {
        setSelectedNote(note);
        setIsEditing(true);
    };

    const handleDeleteNote = async (noteId: number) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                const success = await api.deleteNote(noteId);
                if (success) {
                    setNotes(notes.filter(note => note.id !== noteId));
                }
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    const handleSaveNote = async (title: string, content: string) => {
        try {
            if (selectedNote) {
                const success = await api.updateNote(selectedNote.id, title, content);
                if (success) {
                    await loadNotes();
                }
            } else {
                const newNote = await api.addNote(title, content);
                setNotes([newNote, ...notes]);
            }
            setIsEditing(false);
            setSelectedNote(undefined);
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {isEditing ? (
                <NoteEditor
                    note={selectedNote}
                    onSave={handleSaveNote}
                    onCancel={() => {
                        setIsEditing(false);
                        setSelectedNote(undefined);
                    }}
                />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">My Notes</h1>
                        <button
                            onClick={handleAddNote}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Note
                        </button>
                    </div>
                    <NotesList
                        notes={notes}
                        onEditNote={handleEditNote}
                        onDeleteNote={handleDeleteNote}
                    />
                </>
            )}
        </div>
    );
}

export default App;
