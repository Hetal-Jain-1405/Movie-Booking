from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from .router import user, movies, booking, payment, shows

from . import models
from .database import engine

app = FastAPI()

origins = [
        "http://localhost:5173",
        'https://movie-booking-pi-three.vercel.app',
        
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

@app.get('/')
def testing():
    return {'message': 'hello'}

app.include_router(user.router)
app.include_router(movies.router)
app.include_router(booking.router)
app.include_router(payment.router)
app.include_router(shows.router)