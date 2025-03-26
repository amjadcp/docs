import webview
from PyQt6.QtWidgets import QApplication
import sys
from database.config import init_db
from auth.service import AuthService
from notes.service import NotesService
from websockets.server import serve
import asyncio
import json
from dotenv import load_dotenv

load_dotenv()

class API:
    def __init__(self):
        self.auth_service = AuthService()
        self.notes_service = NotesService()
        
    async def handle_websocket(self, websocket):
        async for message in websocket:
            data = json.loads(message)
            event_type = data.get('type')
            payload = data.get('payload')
            
            if event_type == 'note_updated':
                # Broadcast note updates to all connected clients
                await websocket.send(json.dumps({
                    'type': 'note_update',
                    'payload': payload
                }))

async def start_websocket_server():
    async with serve(API().handle_websocket, "localhost", 8765):
        await asyncio.Future()  # run forever

def main():
    # Initialize database
    init_db()
    
    # Start WebSocket server in background
    loop = asyncio.get_event_loop()
    loop.create_task(start_websocket_server())
    
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
