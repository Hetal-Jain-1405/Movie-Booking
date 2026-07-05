from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, models, database, oauth2


router = APIRouter(
    prefix='/shows',
    tags=['Shows']
)

@router.get('/{imdbID}', response_model=List[schemas.ShowResponse])
def get_shows(imdbID: str,db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):

    shows = ( db.query(models.Show)
                    .filter(models.Show.imdb_id == imdbID)
                    .all()
    )

    return shows

@router.get('/details/{show_id}', response_model=schemas.ShowResponse)
def show_details(show_id: int, db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):

    show_details = ( db.query(models.Show)
                        .filter(models.Show.id == show_id)
                        .first()
                    )
    
    return show_details