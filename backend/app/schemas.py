from pydantic import BaseModel, EmailStr
from datetime import date, time
from typing import Optional

class User(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[int]


class ShowResponse(BaseModel):
    id: int
    imdb_id: str
    date_scheduled: date
    time_scheduled: time
    price: int
    screen_number: int

    class Config():
        from_attributes = True

class PaymentRequest(BaseModel):
    payment_mode: str
    amount: int
    is_success: bool

class PaymentResponse(PaymentRequest):
    id: int

    class Config():
        from_attributes = True

class CreateBooking(BaseModel):
    show_id: int
    count_of_tickets: int

class AllBooking(BaseModel):
    id: int
    count_of_tickets: int
    show: ShowResponse
    payment: PaymentResponse

    class Config():
        all_attributes = True

