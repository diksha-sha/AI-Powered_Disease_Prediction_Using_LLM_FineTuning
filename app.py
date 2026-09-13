from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_MODEL = "Qwen/Qwen2.5-0.5B-Instruct"
ADAPTER_PATH = "./qwen_disease_adapter"

tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)

base_model = AutoModelForCausalLM.from_pretrained(
    BASE_MODEL,
    torch_dtype=torch.float32,
    device_map="cpu"
)

model = PeftModel.from_pretrained(
    base_model,
    ADAPTER_PATH
)

model.eval()


class SymptomRequest(BaseModel):
    symptoms: str


@app.get("/")
def home():
    return {"message": "AI Disease Prediction API is running"}


@app.post("/predict")
def predict(request: SymptomRequest):

    prompt = f"""Based on the following symptoms, predict the disease.

Symptoms: {request.symptoms}

Disease:"""

    inputs = tokenizer(
        prompt,
        return_tensors="pt"
    )

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=30,
            do_sample=False
        )

    generated_tokens = outputs[0][inputs["input_ids"].shape[1]:]

    prediction = tokenizer.decode(
        generated_tokens,
        skip_special_tokens=True
    ).strip()

    return {
        "symptoms": request.symptoms,
        "prediction": prediction
    }