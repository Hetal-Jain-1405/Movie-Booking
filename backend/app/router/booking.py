from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, models, database, oauth2

router = APIRouter(
    prefix = '/booking',
    tags = ['Bookings']
)

@router.post('/new')
def new_booking(booking_data: schemas.CreateBooking, db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):

    new_booking = models.Booking(**booking_data.model_dump())
    new_booking.user_id = current_user.id

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return new_booking


@router.get('/all', response_model= List[schemas.AllBooking])
def all_bookings(current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(database.get_db)):

    user_bookings =( db.query(models.Booking)
                    .join(models.Booking.show)
                    .join(models.Booking.payment)
                    .filter(models.Booking.user_id == current_user.id)
                    .all()
                    )
    
    return user_bookings