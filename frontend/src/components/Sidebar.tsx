// src/components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  onNewNote: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewNote }) => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b">My Notes</div>
      <div className="flex-1 p-4">
        {/* Future navigation items (e.g., Settings, Document Builder) */}
      </div>
      <div className="p-4 border-t">
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition-colors"
          onClick={onNewNote}
        >
          New Note
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
