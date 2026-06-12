for backend -- run # Activate the virtual environment and start the FastAPI server
source .venv/bin/activate
uvicorn app:app --port 8000 --reload

for frontend 
cd frontend 
npm run dev