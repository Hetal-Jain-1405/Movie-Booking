from sqlalchemy import Column, Integer, String 
from datetime import date

from .database import Base

class User(Base):

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable = False)
    # dob = Column()
    email = Column(String, nullable = False)
    password = Column(String, nullable = False)
