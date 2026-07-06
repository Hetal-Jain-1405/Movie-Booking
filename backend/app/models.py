from sqlalchemy import Column, Integer, String, Date, Time, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable = False)
    # dob = Column(Date)
    email = Column(String, nullable = False)
    password = Column(String, nullable = False)

    bookings = relationship('Booking', back_populates='user')
class Show(Base):
    __tablename__ = 'shows'

    id = Column(Integer, primary_key=True, nullable=False)
    imdb_id = Column(String, nullable=False)
    date_scheduled = Column(Date, nullable=False)
    time_scheduled = Column(Time, nullable = False)
    price = Column(Integer, nullable=False)
    screen_number = Column(Integer, nullable=False)

    bookings = relationship('Booking', back_populates='show')
class Payment(Base):
    __tablename__ = 'payments'

    id = Column(Integer, primary_key = True, nullable = False)
    payment_mode = Column(String, nullable = False)
    amount = Column(Integer, nullable = False)
    is_success = Column(Boolean, nullable = False, default=False)

    bookings = relationship('Booking', back_populates='payment')

class Booking(Base):
    __tablename__ = 'bookings'

    id = Column(Integer, primary_key = True, nullable = False)
    show_id = Column(Integer, ForeignKey('shows.id'), nullable = False)
    user_id = Column(Integer, ForeignKey('users.id'),nullable = False)
    count_of_tickets = Column(Integer, nullable = False)
    payment_id = Column(Integer, ForeignKey('payments.id'), unique = True, nullable=True)

    user = relationship('User', back_populates='bookings')
    show = relationship('Show', back_populates='bookings')
    payment = relationship('Payment', back_populates='bookings')

