from ..database.config import get_db
from ..auth.models import User
from .models import Note
from datetime import datetime
import aiohttp
import os

class NotesService:
    def __init__(self):
        self.github_token = os.getenv('GITHUB_TOKEN')
        
    def get_notes(self, user_id: int):
        db = next(get_db())
        # return db.query(Note).filter(Note.user_id == user_id).all()
        return db.query(Note).all()
        
    def create_note(self, user_id: int, title: str, content: str):
        db = next(get_db())
        note = Note(
            title=title,
            content=content,
            user_id=user_id,
            version=1
        )
        db.add(note)
        db.commit()
        db.refresh(note)
        return note
        
    def update_note(self, note_id: int, user_id: int, title: str, content: str):
        db = next(get_db())
        note = db.query(Note).filter(
            Note.id == note_id,
            Note.user_id == user_id
        ).first()
        
        if note:
            note.title = title
            note.content = content
            note.version += 1
            note.updated_at = datetime.now(datetime.timezone.utc)
            db.commit()
            db.refresh(note)
            return note
        return None
        
    async def sync_to_github(self, note_id: int, user_id: int):
        db = next(get_db())
        note = db.query(Note).filter(
            Note.id == note_id,
            Note.user_id == user_id
        ).first()
        
        if not note or not self.github_token:
            return False
            
        # Get user's GitHub token
        user = db.query(User).filter(User.id == user_id).first()
        if not user or not user.github_token:
            return False
            
        # Create or update file in GitHub
        headers = {
            "Authorization": f"token {user.github_token}",
            "Accept": "application/vnd.github.v3+json"
        }
        
        async with aiohttp.ClientSession() as session:
            # You would implement the GitHub API calls here
            # This is a simplified example
            pass
            
        return True
