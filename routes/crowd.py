from fastapi import APIRouter
from services.crowd_service import predict_crowd

router = APIRouter()


@router.post("/predict-crowd")
def crowd_prediction(data: dict):
    return predict_crowd(data)