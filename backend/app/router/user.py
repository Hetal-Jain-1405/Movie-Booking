from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import schemas, database, models, utils, oauth2


router = APIRouter(
    prefix='/users',
    tags= ['Authentication']
)


@router.post('/new')
def new_user(user: schemas.User, db: Session = Depends(database.get_db)):
    
    hashed_password = utils.hash(user.password)
    user.password = hashed_password

    new_user = models.User(**user.model_dump())

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = oauth2.create_access_token(data= {'user_id': new_user.id})

    return {'access_token': access_token, 'token_type': 'bearer'}

@router.post('/login', response_model = schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):

    user = ( db.query(models.User)
            .filter(user_credentials.username == models.User.email)
            .first() )

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= 'Invalid credentials')
    
    if not utils.verify_password(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Invalid credentials')
    
    access_token = oauth2.create_access_token(data= {'user_id': user.id})

    return {'access_token': access_token, 'token_type': 'bearer'}

@router.get('/profile', response_model=schemas.UserResponse)
def user_profile(db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):
    
    profile = ( db.query(models.User)
                  .filter(models.User.id == current_user.id)
                  .first()
                )
    
    return profile