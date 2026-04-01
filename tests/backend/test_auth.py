import pytest
from fastapi import status
from sqlalchemy.orm import Session
from backend.models import User, OTP
from backend.utils import get_password_hash, verify_password
from datetime import datetime, timedelta

def test_create_user(client, session: Session):
    user_data = {"email": "test@example.com", "password": "shortpass"}
    response = client.post("/auth/register", json=user_data)
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert "status" in data

    user_in_db = session.query(User).filter(User.email == "test@example.com").first()
    assert user_in_db is not None
    assert user_in_db.email == "test@example.com"
    assert verify_password("shortpass", user_in_db.password_hash)

def test_duplicate_user_registration(client, session: Session):
    user_data = {"email": "duplicate@example.com", "password": "shortpass"}
    client.post("/auth/register", json=user_data)
    response = client.post("/auth/register", json=user_data)
    assert response.status_code == status.HTTP_409_CONFLICT
    assert response.json() == {"detail": "Email already registered"}

def test_login_success(client, session: Session):
    hashed_password = get_password_hash("shortpass")
    user = User(email="login@example.com", password_hash=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)

    login_data = {"email": "login@example.com", "password": "shortpass"}
    response = client.post("/auth/login", json=login_data)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_invalid_credentials(client):
    login_data = {"email": "nonexistent@example.com", "password": "wrongpass"}
    response = client.post("/auth/login", json=login_data)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Invalid credentials"}

def test_forgot_password_request_success(client, session: Session):
    hashed_password = get_password_hash("shortpass")
    user = User(email="forgot@example.com", password_hash=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)

    response = client.post("/auth/forgot-password", json={"email": "forgot@example.com"})
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"message": "OTP sent to forgot@example.com"}

    otp_in_db = session.query(OTP).filter(OTP.user_id == user.id).first()
    assert otp_in_db is not None
    assert otp_in_db.otp_code is not None
    assert otp_in_db.expires_at > datetime.utcnow()

def test_forgot_password_request_unregistered_email(client):
    response = client.post("/auth/forgot-password", json={"email": "unregistered@example.com"})
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "User not found"}

def test_login_with_otp_success(client, session: Session):
    hashed_password = get_password_hash("shortpass")
    user = User(email="otp_login@example.com", password_hash=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)

    # Manually create an OTP for the user
    otp_code = "123456"
    expires_at = datetime.utcnow() + timedelta(minutes=5)
    otp = OTP(user_id=user.id, otp_code=otp_code, expires_at=expires_at)
    session.add(otp)
    session.commit()
    session.refresh(otp)

    otp_data = {"email": "otp_login@example.com", "otp_code": otp_code}
    response = client.post("/auth/login-with-otp", json=otp_data)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

    # Verify OTP is invalidated after use
    assert session.query(OTP).filter(OTP.id == otp.id).first() is None

def test_login_with_otp_invalid_otp(client, session: Session):
    hashed_password = get_password_hash("shortpass")
    user = User(email="invalid_otp@example.com", password_hash=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)

    # Manually create an OTP for the user
    otp_code = "123456"
    expires_at = datetime.utcnow() + timedelta(minutes=5)
    otp = OTP(user_id=user.id, otp_code=otp_code, expires_at=expires_at)
    session.add(otp)
    session.commit()
    session.refresh(otp)

    otp_data = {"email": "invalid_otp@example.com", "otp_code": "654321"}
    response = client.post("/auth/login-with-otp", json=otp_data)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Invalid OTP"}

def test_login_with_otp_expired_otp(client, session: Session):
    hashed_password = get_password_hash("shortpass")
    user = User(email="expired_otp@example.com", password_hash=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)

    # Manually create an expired OTP for the user
    otp_code = "112233"
    expires_at = datetime.utcnow() - timedelta(minutes=5)
    otp = OTP(user_id=user.id, otp_code=otp_code, expires_at=expires_at)
    session.add(otp)
    session.commit()
    session.refresh(otp)

    otp_data = {"email": "expired_otp@example.com", "otp_code": otp_code}
    response = client.post("/auth/login-with-otp", json=otp_data)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "OTP expired"}
