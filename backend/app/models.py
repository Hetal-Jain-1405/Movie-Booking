from sqlalchemy import Column, Integer, String, Date, Time


from .database import Base

class User(Base):

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable = False)
    # dob = Column()
    email = Column(String, nullable = False)
    password = Column(String, nullable = False)

class Show(Base):
    __tablename__ = 'shows'

    id = Column(Integer, primary_key=True, nullable=False)
    imdb_id = Column(String, nullable=False)
    date_scheduled = Column(Date, nullable=False)
    time_scheduled = Column(Time, nullable = False)
    price = Column(Integer, nullable=False)
    screen_number = Column(Integer, nullable=False)

