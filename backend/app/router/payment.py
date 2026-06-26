from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from .. import database, schemas, models, oauth2

router = APIRouter(
    prefix = '/payment',
    tags = ['Payment']
)

@router.post('/{booking_id}')
def payment(payment_details: schemas.PaymentRequest, booking_id: int, db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):

    verify_booking = db.query(models.Booking).get(booking_id)
    if not verify_booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Invalid Booking ID')
    
    if verify_booking.payment_id:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail = 'Duplicate Payment')
    
    payment = models.Payment(**payment_details.model_dump())

    db.add(payment)
    db.commit()
    db.refresh(payment)

    verify_booking.payment_id = payment.id

    db.commit()
    db.refresh(payment)

    return payment
