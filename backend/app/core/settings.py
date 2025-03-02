from pydantic import BaseModel
#example of how to use the settings
class Settings(BaseModel):
    DATABASE_URL: str ="postgresql://postgres:postgres@db:5432/bookfinder"
    SECRET_KEY: str="bbbbbb2342342342423"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env" 