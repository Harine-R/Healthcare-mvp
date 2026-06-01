from fastapi import APIRouter
from services.treatment_service import compare_treatment

router = APIRouter()


@router.post("/compare-treatment")
def treatment_compare(data: dict):

    return compare_treatment(
        data["prescription1"],
        data["prescription2"]
    )