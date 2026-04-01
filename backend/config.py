from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://user:password@db:5432/mydatabase"
    SECRET_KEY: str = "super-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REDIS_URL: str = "redis://redis:6379/0"

    class Config:
        env_file = ".env"

settings = Settings()
