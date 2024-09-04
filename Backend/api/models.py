from pydantic import BaseModel
from typing import Optional

class SignIn(BaseModel):
    name:str
    email: str
    password: str


class ActiveUser(BaseModel):
    id: str
    name: str
    email: str


class ChangePassword(BaseModel):
    userId:str
    currentPassword:str
    newPassword: str


class SubscriptionRequest(BaseModel):
    email: str


class imageData(BaseModel):
    UserId: str
    predicted_shot: str
    confidence: str
    result_image_1: str
    result_image_2: str
    result_image_3: str
    

class videoData(BaseModel):
    UserId : str
    shots_played: int
    shot_sequence: list[str]
    bowled_count: int
    cover_drive_count: int
    defence_count: int
    pull_count: int
    reverse_sweep_count: int
    bowled_avg_prob: float
    cover_drive_avg_prob: float
    defence_avg_prob: float
    pull_avg_prob: float
    reverse_sweep_avg_prob: float
    bowled_shot_runs: float
    cover_drive_shot_runs: float
    defence_shot_runs: float
    pull_shot_runs: float
    reverse_sweep_shot_runs: float
    better_shot: str
    weak_shot: str
    predicted_video: str


class TokenData(BaseModel):
    email: Optional[str] = None