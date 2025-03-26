import React, { useState, useEffect } from 'react';
import { Note } from '../types/note';
import ReactMarkdown from 'react-markdown';

interface NoteEditorProps {
    note?: Note;
    onSave: (title: string, content: string) => void;
    onCancel: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel }) => {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');
    const [isPreview, setIsPreview] = useState(false);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            onSave(title, content);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end gap-2 mb-2">
                    <button
                        type="button"
                        onClick={() => setIsPreview(!isPreview)}
                        className="px-4 py-2 text-sm text-blue-600"
                    >
                        {isPreview ? 'Edit' : 'Preview'}
                    </button>
                </div>
                {isPreview ? (
                    <div className="prose max-w-none p-4 border rounded min-h-[300px]">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                ) : (
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your note in markdown..."
                        className="w-full h-[300px] px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                )}
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};
