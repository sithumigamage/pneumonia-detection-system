from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Pneumonia Detection API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Model_PATH = "best_model.h5"
model = load_model(Model_PATH)

CLASS_NAMES = ['Normal', 'Pneumonia']

#Image Preprocessing Feature
def preprocess_image(img):
    img = img.resize((150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    
    return img_array

@app.post("/predict/")
async def predict_pneumonia(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert('RGB')
        processed_img = preprocess_image(img)
        
        prediction = model.predict(processed_img)
        predicted_class = int(prediction[0][0] > 0.5)
        confidence = float(prediction[0][0] if predicted_class else 1 - prediction[0][0])
    
        result = {
            "prediction": CLASS_NAMES[predicted_class],
            "confidence": round(confidence * 100, 2),
            "message": "Pneumonia detected" if predicted_class else "No pneumonia detected"
        }
        
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
