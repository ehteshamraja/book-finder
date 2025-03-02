from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class BookSearch(BaseModel):
    id:str
    

    class Config:
        orm_mode = True

