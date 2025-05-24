import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0]);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
      setResult(null);
      setError(null);
    }
  });

  const uploadImage = async () => {
    if (!file) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/predict/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="app">
      <h1>Pneumonia Detection</h1>
      <p>Upload a chest X-ray image to check for pneumonia</p>

      {!file ? (
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag & drop an image here, or click to select</p>
          )}
        </div>
      ) : (
        <div className="preview-container">
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
          <button onClick={reset} className="reset-btn">
            Change Image
          </button>
          <button
            onClick={uploadImage}
            disabled={loading}
            className="predict-btn"
          >
            {loading ? 'Processing...' : 'Check for Pneumonia'}
          </button>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {result && (
        <div className={`result ${result.prediction === 'Pneumonia' ? 'positive' : 'negative'}`}>
          <h2>Result: {result.prediction}</h2>
          <p>{result.message}</p>
          <p>Confidence: {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}

export default App;