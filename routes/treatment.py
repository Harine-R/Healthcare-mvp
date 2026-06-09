from fastapi import APIRouter
from services.treatment_service import compare_treatment

router = APIRouter()

@router.post("/compare-treatment")
def treatment_compare(data: dict):

    print(type(data["prescription1"]))
    print(data["prescription1"])

    return compare_treatment(
        data["prescription1"],
        data["prescription2"]
    )