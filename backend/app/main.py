from fastapi import FastAPI
from .router import user

from . import models
from .database import engine

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

@app.get('/')
def testing():
    return {'message': 'hello'}

app.include_router(user.router)
