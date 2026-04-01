from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine, Base, get_db
from backend import models, schemas, utils
from datetime import timedelta
import uuid
from backend.routers import auth

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router, prefix="/auth", tags=["auth"])
