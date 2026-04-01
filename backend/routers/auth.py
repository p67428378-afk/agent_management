from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas, utils
from datetime import timedelta, datetime
import uuid

router = APIRouter()

@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
    
    hashed_password = utils.get_password_hash(user.password)
    
    db_user = models.User(email=user.email, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login", response_model=schemas.Token)
def login_for_access_token(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not utils.verify_password(user.password, db_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = utils.create_access_token(
        data={"sub": db_user.email},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/forgot-password", response_model=schemas.MessageResponse)
def forgot_password(otp_request: schemas.OTPRequest, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == otp_request.email).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    # Generate OTP
    otp_code = "123456" # In a real app, generate a random OTP
    expires_at = datetime.utcnow() + timedelta(minutes=5)
    
    # Invalidate any existing OTPs for the user
    db.query(models.OTP).filter(models.OTP.user_id == db_user.id).delete()
    db.commit()

    db_otp = models.OTP(user_id=db_user.id, otp_code=otp_code, expires_at=expires_at)
    db.add(db_otp)
    db.commit()
    
    # TODO: Integrate with email service to send OTP
    print(f"Sending OTP {otp_code} to {otp_request.email}")
    
    return {"message": f"OTP sent to {otp_request.email}"}

@router.post("/login-with-otp", response_model=schemas.Token)
def login_with_otp(otp_verify: schemas.OTPVerify, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == otp_verify.email).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    db_otp = db.query(models.OTP).filter(
        models.OTP.user_id == db_user.id,
        models.OTP.otp_code == otp_verify.otp_code
    ).first()

    if not db_otp:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid OTP")
    
    if db_otp.expires_at < datetime.utcnow():
        db.delete(db_otp)
        db.commit()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="OTP expired")
    
    # OTP is valid, delete it and log in the user
    db.delete(db_otp)
    db.commit()

    access_token_expires = timedelta(minutes=30)
    access_token = utils.create_access_token(
        data={"sub": db_user.email},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
