import webview
from PyQt6.QtWidgets import QApplication
import sys
from backend.notes.service import NotesService
from backend.database.config import init_db
from dotenv import load_dotenv

load_dotenv()

class API(NotesService):
    def __init__(self):
        super().__init__()

def main():
    # Initialize database
    init_db()
    
    # Start PyWebView application
    api = API()
    app = QApplication(sys.argv)
    window = webview.create_window(
        'Notes App',
        'frontend/dist/index.html',
        js_api=api
    )
    webview.start(gui='qt', debug=True)

if __name__ == '__main__':
    main()
