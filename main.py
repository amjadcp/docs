import webview
import sqlite3
import os
from PyQt6.QtWidgets import QApplication
import sys

class NotesAPI:
    def __init__(self):
        self.db_path = 'notes.db'
        self.init_db()

    def init_db(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()

    def get_notes(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT id, title, content, created_at FROM notes ORDER BY created_at DESC')
        notes = [{'id': row[0], 'title': row[1], 'content': row[2], 'created_at': row[3]} 
                for row in cursor.fetchall()]
        conn.close()
        return notes

    def add_note(self, title, content):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO notes (title, content) VALUES (?, ?)', (title, content))
        note_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return note_id

    def update_note(self, note_id, title, content):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('UPDATE notes SET title = ?, content = ? WHERE id = ?', 
                      (title, content, note_id))
        conn.commit()
        conn.close()
        return True

    def delete_note(self, note_id):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM notes WHERE id = ?', (note_id,))
        conn.commit()
        conn.close()
        return True

def get_html():
    html_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html')
    if os.path.exists(html_path):
        return html_path
    return None

if __name__ == '__main__':
    api = NotesAPI()
    app = QApplication(sys.argv)
    window = webview.create_window('Notes App', get_html(), js_api=api)
    webview.start(gui='qt', debug=True)
