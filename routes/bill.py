from fastapi import APIRouter
from services.bill_service import analyze_bill

router = APIRouter()


@router.post("/analyze-bill")
def bill_prediction(data: dict):
    return analyze_bill(data)