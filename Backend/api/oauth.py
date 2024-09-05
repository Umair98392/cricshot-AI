import os
import jwt
import pytz
from api.models import TokenData
from api.database import user_collection
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jwt.exceptions import InvalidTokenError
from fastapi import Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# to get a string like this run: openssl rand -hex 32
SECRET_KEY = os.getenv('JWT_Secret_Key')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1200

pwd_cxt = CryptContext(schemes =["bcrypt"],deprecated="auto")


class Hash():
	def bcrypt(password:str):
		return pwd_cxt.hash(password)
	def verify(hashed,normal):
		return pwd_cxt.verify(normal,hashed)
	

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token:str,credentials_exception):
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
		email: str = payload.get("sub")
		if email is None:
			raise credentials_exception
		token_data = TokenData(email=email)
		user = user_collection.find_one({"email":token_data.email})
		return {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"]
            }
		
	except InvalidTokenError:
	    raise credentials_exception
	


def get_current_user(token: str = Depends(oauth2_scheme)):
	credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
	return verify_token(token,credentials_exception)


def get_ist_time():
    utc_time = datetime.utcnow()
    ist_timezone = pytz.timezone('Asia/Kolkata')
    ist_time = utc_time.replace(tzinfo=pytz.utc).astimezone(ist_timezone)
    return ist_time.strftime('%d-%m-%Y %I:%M:%S %p')