from fastapi import APIRouter, status, HTTPException, Depends, Query
from sqlalchemy import func
from sqlalchemy.orm import Session
import httpx

from ..config import settings
from .. import database, schemas, models, oauth2


router = APIRouter(
    prefix= '/movies',
    tags=['Movies']
)

# id = ['tt0111161', 'tt0068646', 'tt0468569', 'tt0050083']

YOUR_KEY = settings.api_key

@router.get('/id/{imdb_id}')
async def single_movie(imdb_id: str, current_user: int = Depends(oauth2.get_current_user)):
    api_url = f'https://www.omdbapi.com/?i={imdb_id}&apikey={YOUR_KEY}'
    async with httpx.AsyncClient() as movies:
        movie_details = await movies.get(api_url)

    return movie_details.json()

@router.get('/all')
async def all_movies(db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):

    imdb_ids = [r[0] for r in db.query(func.distinct(models.Show.imdb_id)).all()]
    # print(type(imdb_ids))
    all_movies = []
    async with httpx.AsyncClient() as movies:
        for imdb_id in imdb_ids:
            api_url = f'https://www.omdbapi.com/?i={imdb_id}&apikey={YOUR_KEY}'
            
            movie_details = await movies.get(api_url)
            all_movies.append(movie_details.json())


    return all_movies
    # return 'ok'

@router.get('/search')
async def single_movie(query: str = Query(...), current_user: int = Depends(oauth2.get_current_user)):
    api_url = f'https://www.omdbapi.com/?t={query}&apikey={YOUR_KEY}'
    async with httpx.AsyncClient() as movies:
        movie_details = await movies.get(api_url)

    return movie_details.json()
          

