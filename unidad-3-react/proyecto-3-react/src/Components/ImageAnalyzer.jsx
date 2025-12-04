/**
 * Componente: Analizador de Imágenes con TensorFlow.js
 * Detecta audiencia en fotos de eventos musicales
 */

import { useState, useRef } from 'react';
import imageAnalysisService from '../services/imageAnalysis';
import './ImageAnalyzer.css';

export default function ImageAnalyzer({ proyecto }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      setResults(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!imageRef.current) return;

    try {
      setAnalyzing(true);
      const result = await imageAnalysisService.countAudience(imageRef.current);
      setResults(result);

      // Dibujar detecciones en el canvas
      drawDetections(result.predictions);
    } catch (error) {
      console.error('Error analizando imagen:', error);
      alert('Error al analizar la imagen. Asegúrate de que sea una imagen válida.');
    } finally {
      setAnalyzing(false);
    }
  };

  const drawDetections = (predictions) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;

    // Dibujar la imagen
    ctx.drawImage(img, 0, 0);

    // Dibujar rectángulos sobre las personas detectadas
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 3;
    ctx.fillStyle = '#00ff0033';

    predictions.forEach(pred => {
      const [x, y, width, height] = pred.bbox;
      ctx.strokeRect(x, y, width, height);
      ctx.fillRect(x, y, width, height);

      // Dibujar etiqueta
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(x, y - 20, width, 20);
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.fillText(`Persona (${(pred.score * 100).toFixed(0)}%)`, x + 5, y - 5);
    });
  };

  return (
    <div className="image-analyzer">
      <div className="analyzer-header">
        <h3>
          <i className="fas fa-users"></i> Análisis de Audiencia
        </h3>
        <p>Sube una foto del evento para detectar la cantidad de oyentes</p>
      </div>

      <div className="analyzer-content">
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="image-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload" className="upload-button">
            <i className="fas fa-cloud-upload-alt"></i>
            Seleccionar Imagen
          </label>

          {selectedImage && (
            <button
              onClick={analyzeImage}
              disabled={analyzing}
              className="analyze-button"
            >
              {analyzing ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Analizando...
                </>
              ) : (
                <>
                  <i className="fas fa-search"></i> Analizar Audiencia
                </>
              )}
            </button>
          )}
        </div>

        {selectedImage && (
          <div className="image-container">
            <img
              ref={imageRef}
              src={selectedImage}
              alt="Imagen a analizar"
              crossOrigin="anonymous"
              style={{ display: results ? 'none' : 'block' }}
            />
            <canvas
              ref={canvasRef}
              style={{ display: results ? 'block' : 'none' }}
            />
          </div>
        )}

        {results && (
          <div className="analysis-results">
            <div className="result-card">
              <div className="result-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="result-info">
                <h4>Personas Detectadas</h4>
                <p className="result-number">{results.totalPeople}</p>
              </div>
            </div>

            <div className="result-card">
              <div className="result-icon" style={{ background: results.audienceLevel.color }}>
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="result-info">
                <h4>Nivel de Audiencia</h4>
                <p className="result-level">{results.audienceLevel.level}</p>
                <div className="level-bar">
                  <div
                    className="level-fill"
                    style={{
                      width: `${(results.audienceLevel.score / 4) * 100}%`,
                      background: results.audienceLevel.color
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="detection-details">
              <h4>Detalles de Detección</h4>
              <ul>
                {results.predictions.slice(0, 5).map((pred, i) => (
                  <li key={i}>
                    Persona {i + 1}: Confianza {(pred.score * 100).toFixed(1)}%
                  </li>
                ))}
                {results.predictions.length > 5 && (
                  <li>... y {results.predictions.length - 5} personas más</li>
                )}
              </ul>
            </div>

            <div className="other-detections">
              <h4>Otros Elementos Detectados</h4>
              <div className="detection-tags">
                {results.allDetections
                  .filter(d => d.class !== 'person')
                  .slice(0, 10)
                  .map((det, i) => (
                    <span key={i} className="detection-tag">
                      {det.class} ({(det.score * 100).toFixed(0)}%)
                    </span>
                  ))
                }
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="analyzer-info">
        <i className="fas fa-info-circle"></i>
        <p>
          Este análisis utiliza IA para detectar personas en fotos de eventos.
          Los resultados son aproximados y pueden variar según la calidad de la imagen.
        </p>
      </div>
    </div>
  );
}
