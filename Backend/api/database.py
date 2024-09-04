import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

mongodb_uri = os.getenv('MongoDB_Secret_Key')

client = MongoClient(mongodb_uri)

# db = client["User"]

# Database Access 
database = client.CricShot_db

# Collection in Database
user_collection = database.user_data
image_collection = database.image_data
video_collection = database.video_data
subscribe_collection = database.subscribe


#create indexes
user_collection.create_index([("email",1)])
image_collection.create_index([("UserId",1)])
video_collection.create_index([("UserId",1)])
subscribe_collection.create_index([("email",1)])