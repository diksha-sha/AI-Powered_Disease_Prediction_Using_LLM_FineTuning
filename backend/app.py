from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow our React frontend to communicate with Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SymptomRequest(BaseModel):
    symptoms: str


@app.get("/")
def home():
    return {"message": "AI Disease Prediction API is running"}


@app.post("/predict")
def predict(request: SymptomRequest):
    symptoms = request.symptoms

    # We will connect your trained Qwen/LoRA model here
    # in the next step.
    prediction = "Model connection coming next"

    return {
        "symptoms": symptoms,
        "prediction": prediction
    }