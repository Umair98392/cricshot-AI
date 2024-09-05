import os
import cv2
import joblib
import warnings
import numpy as np
from bson import ObjectId
from datetime import datetime
from api.i_pred import prediction_on_image
from api.v_pred import prediction_on_video
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI, UploadFile, HTTPException, Depends, status
from api.oauth import Hash, create_access_token, get_current_user, get_ist_time
from api.database import user_collection, image_collection, video_collection, subscribe_collection
from api.models import SignIn, ActiveUser, ChangePassword, SubscriptionRequest, imageData, videoData

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
warnings.filterwarnings("ignore")
from keras.models import load_model


app = FastAPI(redoc_url=None)

# Configure CORS settings
origins = [
    "http://localhost:5173",
    "https://cricshot-ai.netlify.app"
    # Adjust this to match your frontend's URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load the pre-trained model and scaler to transform keypoints
i_model = load_model('./models/trained_model/i_model.keras')
loaded_scaler = joblib.load('./models/trained_model/i_scaler.pkl')
v_model = load_model('./models/trained_model/v_model.keras')

# Define the desired resolution
desired_resolution = (288, 288)


# Home page route
@app.get("/")
async def home():
    return "Welcome  to Crickshot PoseNet : AI Shot Assistant"


@app.post('/register')
async def create_user(request:SignIn):
    # Check if user already exists
    existing_user = user_collection.find_one({"email": request.email})
    if existing_user:
        raise HTTPException(status_code=288, detail="A user with this email already exists")
    
    hashed_pass = Hash.bcrypt(request.password)
    user_object = dict(request)
    user_object["password"] = hashed_pass

    user_id = user_collection.insert_one(user_object)
    if not user_id.inserted_id:
        raise HTTPException(status_code=288, detail="User creation failed")
    
    return {"detail": "User created successfully", "user_id": str(user_id.inserted_id)}
    

@app.post('/login')
async def login(request: OAuth2PasswordRequestForm = Depends()):
	user = user_collection.find_one({"email": request.username})
	if not user:
		raise HTTPException(status_code=288,detail = f'No user found with this {request.username} email')
    
	if not Hash.verify(user["password"],request.password):
		raise HTTPException(status_code=288,detail = f'Wrong password')
    
	access_token = create_access_token(data={"sub": user["email"]})
	return {"access_token": access_token, "token_type": "bearer", "user" : {"id": str(user["_id"]), "name": user["name"], "email": user["email"]}}


@app.get("/get_current_active_user")
def get_current_active_user(current_user: ActiveUser = Depends(get_current_user)):
    return current_user


# Prediction route (For Image)
@app.post("/predict")
async def predict(file: UploadFile, current_user = Depends(get_current_user)):

    # Read and process the uploaded image using OpenCV
    content = await file.read()
    nparr = np.frombuffer(content, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    img = cv2.resize(img, desired_resolution,interpolation=cv2.INTER_LINEAR)
    
    # call prediction function
    predicted_shot, confidence, res_img_1, res_img_2, res_img_3 = prediction_on_image(img, i_model , loaded_scaler)

    if predicted_shot == None:
        return              #Error for invalid image


    # Create JSON response with individual paths
    response_json = {
        "predicted_shot": predicted_shot,
        "confidence": f'{confidence:.2f}%',
        "result_image_1": res_img_1,
        "result_image_2": res_img_2,
        "result_image_3": res_img_3,
    }
    return response_json


# Prediction route (For Video)
@app.post("/predict_video")
async def predict_video(file: UploadFile, current_user = Depends(get_current_user) ):
    # Read and process the uploaded video using OpenCV
    content = await file.read()

    #Save the file to disk
    with open("temp_video.mp4", "wb") as video_file:
        video_file.write(content)
    
    # # Perform video analysis and prediction
    result_json = prediction_on_video(v_model, "temp_video.mp4")
    # Clean up the temporary video file
    os.remove("temp_video.mp4")
    
    return result_json


@app.post("/save-image-data")
async def save_image_data(imageData: imageData, current_user = Depends(get_current_user)):
    try:
        ist_time= get_ist_time()
        image_data_dict = dict(imageData)  # Convert to dictionary
        image_data_dict['date'] = ist_time
        image_data_dict['timestamp'] = datetime.utcnow()
        # Insert the document into MongoDB
        result = image_collection.insert_one(image_data_dict)
        
        return {"message": "Data saved successfully", "id": str(result.inserted_id)}
    
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))
    

@app.post("/save-video-data")
async def save_video_data(videoData: videoData, current_user = Depends(get_current_user)):
    try:
        ist_time= get_ist_time()
        video_data_dict = dict(videoData)
        video_data_dict['date'] = ist_time
        video_data_dict['timestamp'] = datetime.utcnow()
        # Insert the document into MongoDB
        result = video_collection.insert_one(video_data_dict)
        
        return {"message": "Data saved successfully", "id": str(result.inserted_id)}
    
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))


@app.get("/videos/totalEntries/{userId}")
async def totalEntries(userId : str, current_user: ActiveUser = Depends(get_current_user)):
    try:
        count = video_collection.count_documents({ "UserId": userId })
        return count
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))
    

@app.get("/videos/totalPull/{userId}")
async def totalPull(userId : str, current_user: ActiveUser = Depends(get_current_user)):
    try:
        result = video_collection.aggregate([ 
            {"$match": { "UserId": userId} },
            {"$group": { "_id": "$UserId", "totalPullshot": { "$sum": "$pull_count" } } }
            ])
        for document in result:
            return document["totalPullshot"]
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))


@app.get("/videos/totalReverseSweep/{userId}")
async def totalReverseSweep(userId : str, current_user: ActiveUser = Depends(get_current_user)):
    try:
        result = video_collection.aggregate([
            { "$match": { "UserId": userId} },  
            { "$group": { "_id": "$UserId", "totalReverseSweep": { "$sum": "$reverse_sweep_count" } } }
            ])

        for document in result:
            return document["totalReverseSweep"]
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))


@app.get("/videos/totalDefence/{userId}")
async def totalDefence(userId : str, current_user: ActiveUser = Depends(get_current_user)):
    try:
        result = video_collection.aggregate([
            { "$match": { "UserId": userId } }, 
            { "$group": { "_id": "$UserId", "totalDefence": { "$sum": "$defence_count" } } } 
            ])

        for document in result:
            return document["totalDefence"]
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))


@app.get("/videos/totalCoverDrive/{userId}")
async def totalCoverDrive(userId : str, current_user: ActiveUser = Depends(get_current_user)):
    try:
        result = video_collection.aggregate([
            { "$match": { "UserId": userId } }, 
            { "$group": { "_id": "$UserId", "totalCoverDrive": { "$sum": "$cover_drive_count" } } }  
            ])

        for document in result:
            return document["totalCoverDrive"]
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))


@app.get("/videos/totalBowled/{userId}")
async def totalBowled(userId : str, current_user: ActiveUser = Depends(get_current_user)):
    try:
        result = video_collection.aggregate([
            { "$match": { "UserId": userId} },  
            { "$group": { "_id": "$UserId", "totalBowled": { "$sum": "$bowled_count" } } }  
            ])

        for document in result:
            return document["totalBowled"]
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))


@app.get("/videos/currentmatchentry/{userId}")
async def currentmatchentry(userId : str, current_user: ActiveUser = Depends(get_current_user)):
    try:
        result = video_collection.find({ "UserId": userId },{"_id":0}).sort({ "timestamp": -1 }).limit(1);
        if result:
            for document in result:
                return document
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))


@app.get("/videos/secondlastentry/{userId}")
async def secondlastentry(userId : str, current_user: ActiveUser = Depends(get_current_user)):
    try:
        result = video_collection.find({ "UserId": userId },{"_id":0, "bowled_avg_prob":1,  "cover_drive_avg_prob":1, "defence_avg_prob":1, "pull_avg_prob":1,  "reverse_sweep_avg_prob":1}).sort({ "timestamp": -1 }).skip(1).limit(1);
        if result:
            for document in result:
                
                return document
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))
    

@app.get("/videos/latest4Videos/{userId}")
async def secondlastentry(userId : str, current_user: ActiveUser = Depends(get_current_user)):
    try:
        result = video_collection.find({ "UserId": userId },{"_id":0,"date": 1,"shots_played":1,"better_shot":1,"weak_shot":1,"predicted_video":1}).sort({ "timestamp": -1 }).limit(4);
        res=[]
        if result:
            for document in result:
                res.append(document)
            return res
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))


@app.get("/images/latest4Images/{userId}")
async def latest4Images(userId : str, current_user: ActiveUser = Depends(get_current_user)):
    try:
        result = image_collection.find({ "UserId": userId },{"_id":0,"date": 1,"confidence":1,"predicted_shot":1,"result_image_1":1,"result_image_2":1,"result_image_3":1}).sort({ "timestamp": -1 }).limit(4);
        res=[]
        if result:
            for document in result:
                res.append(document)
            return res
    except Exception as e:
        raise HTTPException(status_code=288, detail=str(e))


@app.post("/change-password/{userId}")
async def change_password(request: ChangePassword, current_user: ActiveUser = Depends(get_current_user)):
    user = user_collection.find_one({"_id":ObjectId(request.userId)})
    
    if not Hash.verify(user["password"],request.currentPassword):
        raise HTTPException(status_code=288,detail = f'Wrong password')
    if len(request.newPassword) < 6:
        raise HTTPException(status_code=289, detail="New password is too short")

    # Update the password in the database
    new_hashed_password = Hash.bcrypt(request.newPassword)
    user_collection.update_one(
        {"_id": ObjectId(request.userId)},
        {"$set": {"password": new_hashed_password}}
    )
    return {"detail": "Password changed successfully"}


@app.post("/subscribe")
async def subscribe(subscription: SubscriptionRequest):
    email = subscription.email
    user = subscribe_collection.find_one({"email": email})
    if user:
        raise HTTPException(status_code=288, detail="Email already subscribed")

    subscribe_collection.insert_one({"email": email})
    return {"detail": "Subscribed successfully"}


# 288 == means error for this app