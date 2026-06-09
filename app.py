from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.bill import router as bill_router
from routes.crowd import router as crowd_router
from routes.treatment import router as treatment_router

app = FastAPI(
    title="Smart Healthcare Decision Assistant"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bill_router)
app.include_router(crowd_router)
app.include_router(treatment_router)

@app.get("/")
def home():
    return {
        "message": "Smart Healthcare Decision Assistant API"
    }