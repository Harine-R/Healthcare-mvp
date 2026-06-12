from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from services.treatment_service import compare_treatment

router = APIRouter()

# ✅ Strong validation (THIS FIXES EVERYTHING)
class PrescriptionRequest(BaseModel):
    prescription1: List[str]
    prescription2: List[str]


@router.post("/compare-treatment")
def treatment_compare(data: PrescriptionRequest):

    print("P1 TYPE:", type(data.prescription1))
    print("P1 VALUE:", data.prescription1)

    print("P2 TYPE:", type(data.prescription2))
    print("P2 VALUE:", data.prescription2)

    return compare_treatment(
        data.prescription1,
        data.prescription2
    )