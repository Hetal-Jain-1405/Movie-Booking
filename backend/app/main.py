from fastapi import FastAPI
from .router import user, movies, booking, payment

from . import models
from .database import engine

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

@app.get('/')
def testing():
    return {'message': 'hello'}

app.include_router(user.router)
app.include_router(movies.router)
app.include_router(booking.router)
app.include_router(payment.router)
