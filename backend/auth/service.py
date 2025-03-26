import jwt
import bcrypt
from datetime import datetime, timedelta
import os
from database.config import get_db
from .models import User

class AuthService:
    def __init__(self):
        self.secret_key = os.getenv('JWT_SECRET_KEY', 'your-secret-key')
        
    def create_access_token(self, user_id: int):
        expires_delta = timedelta(days=1)
        expire = datetime.utcnow() + expires_delta
        
        to_encode = {
            "user_id": user_id,
            "exp": expire
        }
        return jwt.encode(to_encode, self.secret_key, algorithm="HS256")
    
    def verify_token(self, token: str):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=["HS256"])
            return payload.get("user_id")
        except:
            return None
            
    def register_user(self, email: str, password: str):
        db = next(get_db())
        
        # Check if user exists
        if db.query(User).filter(User.email == email).first():
            return None
            
        # Hash password
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        # Create user
        user = User(email=email, hashed_password=hashed)
        db.add(user)
        db.commit()
        db.refresh(user)
        
        return self.create_access_token(user.id)
        
    def login(self, email: str, password: str):
        db = next(get_db())
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            return None
            
        if not bcrypt.checkpw(password.encode('utf-8'), user.hashed_password):
            return None
            
        return self.create_access_token(user.id)
