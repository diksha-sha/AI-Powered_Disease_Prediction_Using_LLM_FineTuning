# 🩺 Disease Prediction Using LLM Fine-Tuning

An **AI-powered disease classification system** that uses **Large Language Model (LLM) fine-tuning** to predict disease categories from natural-language descriptions of symptoms.

The project fine-tunes an instruction-following language model using **LoRA (Low-Rank Adaptation)** and **PEFT (Parameter-Efficient Fine-Tuning)**, enabling the model to learn the relationship between patient-reported symptoms and disease labels while requiring significantly fewer trainable parameters than full model fine-tuning.

> ⚠️ **Disclaimer:** This project is developed for educational and research purposes only. It is not a medical diagnostic system and should not be used as a substitute for professional medical advice.

---

## 📌 Project Overview

Traditional disease prediction systems often require users to select symptoms from predefined lists or provide structured medical information.

This project explores a more natural approach: allowing users to describe their symptoms in **plain English**, after which a fine-tuned LLM predicts the corresponding disease category.

### Example

**Input:**

```text
I have a high fever, severe headache, body pain,
nausea and red spots on my skin.
```

**Model Output:**

```text
dengue
```

The system treats disease prediction as a **text classification / instruction-following task**.

---

## 🎯 Objectives

* Build a disease prediction system using an LLM.
* Convert symptom descriptions into an instruction-tuning dataset.
* Fine-tune an instruction-following language model using LoRA.
* Reduce computational requirements using PEFT.
* Evaluate the fine-tuned model using standard classification metrics.
* Test the model on previously unseen symptom descriptions.
* Develop a foundation for an interactive disease prediction application.

---

## 🧠 Methodology

The complete workflow is:

```text
                 ┌──────────────────────┐
                 │   Disease Dataset    │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │   Data Cleaning      │
                 │   & Preprocessing    │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │ Train / Validation   │
                 │ / Test Split         │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │ Instruction          │
                 │ Formatting           │
                 └──────────┬───────────┘
                            ↓
              ┌─────────────────────────────┐
              │ Instruction-Following LLM  │
              └──────────────┬──────────────┘
                             ↓
                    ┌────────────────┐
                    │ LoRA / PEFT    │
                    │ Fine-Tuning     │
                    └───────┬────────┘
                            ↓
                 ┌──────────────────────┐
                 │ Fine-Tuned LLM      │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │ New Symptom Input   │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │ Disease Prediction  │
                 └──────────────────────┘
```

---

## 📊 Dataset

The dataset consists of natural-language symptom descriptions and corresponding disease labels.

### Dataset Format

| Column        | Description                              |
| ------------- | ---------------------------------------- |
| `input_text`  | Natural-language description of symptoms |
| `output_text` | Corresponding disease category           |

### Example

```text
input_text:
I have a skin rash that is red and swollen.
I also have a severe fever and body pain.

output_text:
dengue
```

The `input_text` column is used as the model input, while `output_text` represents the target disease category.

---

## 🧹 Data Preprocessing

The dataset is processed before fine-tuning.

Steps include:

1. Removing missing values.
2. Removing duplicate records.
3. Cleaning whitespace.
4. Normalizing disease labels.
5. Checking class distribution.
6. Identifying potential class imbalance.
7. Splitting the dataset into training, validation, and testing sets.

Recommended split:

```text
Training   → 80%
Validation → 10%
Testing    → 10%
```

---

## 🤖 Model

The project uses an instruction-following LLM as the base model.

### Base Model

```text
Qwen2.5-0.5B-Instruct
```

The model is fine-tuned using:

* **LoRA**
* **PEFT**
* **Hugging Face Transformers**
* **Hugging Face TRL**

Instead of updating all parameters of the LLM, LoRA introduces small trainable adapter layers while keeping most of the original model parameters frozen.

### Why LoRA?

Full LLM fine-tuning can require significant computational resources.

LoRA provides:

* Lower GPU memory requirements
* Faster training
* Fewer trainable parameters
* Smaller fine-tuned model components
* Practical fine-tuning on consumer/cloud GPUs

---

## 📝 Instruction Format

The original dataset is converted into an instruction-following format.

Example:

```text
### Instruction:
Predict the disease category based on the patient's symptoms.

### Symptoms:
I have a high fever, headache, body pain and skin rash.

### Response:
dengue
```

This allows the LLM to learn the expected task in an instruction-response format.

---

## 🛠️ Technologies Used

### Programming Language

* Python

### Machine Learning / NLP

* Large Language Models
* Natural Language Processing
* Text Classification
* Instruction Fine-Tuning
* LoRA
* PEFT

### Frameworks & Libraries

* PyTorch
* Hugging Face Transformers
* Hugging Face Datasets
* Hugging Face TRL
* PEFT
* BitsAndBytes
* Scikit-learn
* Pandas
* NumPy

### Development Environment

* Google Colab
* Jupyter Notebook

---

## 📈 Model Evaluation

The fine-tuned model is evaluated using the unseen test dataset.

The following metrics are used:

* Accuracy
* Precision
* Recall
* F1-Score
* Confusion Matrix

Example evaluation format:

| Metric    | Score |
| --------- | ----: |
| Accuracy  |   TBD |
| Precision |   TBD |
| Recall    |   TBD |
| F1-Score  |   TBD |

> Evaluation scores will be updated after fine-tuning the final dataset.

---

## 🔍 Prediction Example

After fine-tuning, the model can receive a new symptom description.

### Input

```text
I have chills, high fever, sweating,
headache and muscle pain.
```

### Output

```text
malaria
```

The model generates the disease category based on patterns learned during fine-tuning.

---

## 📁 Project Structure

```text
Disease-Prediction-LLM/
│
├── data/
│   ├── disease_dataset.csv
│   └── processed_dataset.csv
│
├── notebooks/
│   └── disease_prediction_llm.ipynb
│
├── model/
│   └── disease_prediction_lora/
│
├── src/
│   ├── preprocessing.py
│   ├── train.py
│   ├── evaluate.py
│   └── predict.py
│
├── results/
│   ├── metrics.csv
│   └── confusion_matrix.png
│
├── requirements.txt
│
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/Disease-Prediction-LLM.git
cd Disease-Prediction-LLM
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 📦 Requirements

Example `requirements.txt`:

```text
torch
transformers
datasets
peft
trl
accelerate
bitsandbytes
scikit-learn
pandas
numpy
matplotlib
```

---

## 🚀 Training

Run the preprocessing pipeline:

```bash
python src/preprocessing.py
```

Then start fine-tuning:

```bash
python src/train.py
```

The LoRA adapter will be saved to:

```text
model/disease_prediction_lora/
```

---

## 🧪 Evaluation

Evaluate the model using:

```bash
python src/evaluate.py
```

The evaluation produces:

* Accuracy
* Precision
* Recall
* F1-score
* Confusion matrix

---

## 🔮 Prediction

Run the prediction script:

```bash
python src/predict.py
```

Example:

```text
Enter symptoms:
I have high fever, headache, body pain and skin rash.

Predicted Disease:
dengue
```

---

## 🔬 Future Improvements

Future versions of the project can include:

* Fine-tuning a larger LLM.
* Improving dataset quality and balance.
* Adding more disease categories.
* Using medically validated datasets.
* Adding confidence estimation.
* Implementing Retrieval-Augmented Generation (RAG).
* Adding explainable predictions.
* Building a Streamlit web interface.
* Developing a REST API using FastAPI or Flask.
* Comparing LoRA fine-tuning with full fine-tuning.
* Comparing LLM performance with traditional ML and BERT-based models.

---

## 📌 Limitations

The model has several limitations:

* Predictions depend heavily on the quality and diversity of the training dataset.
* Symptoms can overlap across multiple diseases.
* The model may produce incorrect predictions.
* The model does not replace clinical examination or professional diagnosis.
* Dataset bias can affect model performance.
* Generated predictions should not be interpreted as medical advice.

---

## 👩‍💻 Author

**Diksha Sharma**

B.Tech – Computer Science Engineering
Data Science Specialization

---

## ⭐ Acknowledgements

This project uses open-source technologies and frameworks from:

* Hugging Face
* PyTorch
* PEFT
* Scikit-learn

---

## 📜 License

This project is intended for educational and research purposes.
