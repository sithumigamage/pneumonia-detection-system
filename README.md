# 🫁 Pneumonia Detection from Chest X-Rays using Deep Learning

This project presents an end-to-end intelligent web-based system that detects **Pneumonia** from chest X-ray images using a **Convolutional Neural Network (CNN)**. Designed to support radiologists and healthcare professionals, this system delivers fast, accurate diagnostic feedback in real time.

---

## 🔬 Project Overview

- **Goal**: Early detection of pneumonia using deep learning techniques to assist in clinical decision-making.
- **Architecture**: 
  - **Frontend**: Built with React.js for an intuitive image upload and results interface.
  - **Backend**: Powered by FastAPI to serve the CNN model's predictions via RESTful APIs.
  - **Model**: A custom-trained CNN using TensorFlow/Keras, achieving over **91% accuracy**.
  - **Dataset**: Chest X-ray images from the Kaggle repository, preprocessed and augmented for better generalization.

---

## 🧠 Model Performance

| Metric        | NORMAL | PNEUMONIA | Macro Avg | Weighted Avg |
|---------------|--------|-----------|-----------|---------------|
| Precision     | 98.00% | 78.00%    | 88.00%    | 85.00%        |
| Recall        | 53.00% | 99.00%    | 76.00%    | 82.00%        |
| F1-Score      | 68.00% | 87.00%    | 78.00%    | 80.00%        |
| **Test Accuracy** |       |           |           | **91.73%**     |

---

## 🚀 Features

- 📤 Upload chest X-ray images via a clean web interface.
- ⚡ Instant diagnosis prediction with confidence score.
- 📊 Displays real-time performance metrics and image classification output.
- 🔒 Secure and lightweight backend using FastAPI.
- 📱 Responsive and user-friendly UI built with React.js.

---

## 🛠️ Installation

### Prerequisites

- Python 3.x
- Node.js & npm
- pip

### Clone the Repository

##Backend Setup (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
## Frontend Setup (React.js)
cd frontend
npm install
npm start

## 📊 Model Training Summary


Input size: 150x150 pixels

Optimizer: Adam

Loss function: Binary Crossentropy

Dataset split: 80% training, 10% validation, 10% testing

Augmentation: Rotation, zoom, flips

Epochs: 10+

