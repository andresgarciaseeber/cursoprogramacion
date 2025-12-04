/**
 * Componente: Formulario de Evaluación de Proyectos
 */

import { useState, useEffect } from 'react';
import apiService from '../services/api';
import './EvaluationForm.css';

export default function EvaluationForm({ proyecto }) {
  const [criterios, setCriterios] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Detectar plataforma de audio
  const detectPlatform = (url) => {
    if (!url) return { name: 'Audio', icon: 'fa-music' };

    const urlLower = url.toLowerCase();

    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
      return { name: 'YouTube', icon: 'fa-brands fa-youtube', color: '#FF0000' };
    }
    if (urlLower.includes('spotify.com')) {
      return { name: 'Spotify', icon: 'fa-brands fa-spotify', color: '#1DB954' };
    }
    if (urlLower.includes('soundcloud.com')) {
      return { name: 'SoundCloud', icon: 'fa-brands fa-soundcloud', color: '#FF5500' };
    }
    if (urlLower.includes('bandcamp.com')) {
      return { name: 'Bandcamp', icon: 'fa-brands fa-bandcamp', color: '#629aa9' };
    }
    if (urlLower.includes('apple.com') || urlLower.includes('music.apple')) {
      return { name: 'Apple Music', icon: 'fa-brands fa-apple', color: '#FA243C' };
    }
    if (urlLower.includes('deezer.com')) {
      return { name: 'Deezer', icon: 'fa-brands fa-deezer', color: '#FF0092' };
    }

    return { name: 'Audio', icon: 'fa-music', color: '#667eea' };
  };

  useEffect(() => {
    loadData();
  }, [proyecto]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [criteriosData, evaluacionesData] = await Promise.all([
        apiService.getCriterios(),
        apiService.getEvaluaciones(proyecto.id)
      ]);

      setCriterios(criteriosData);

      // Convertir evaluaciones a objeto { criterioId: puntaje }
      const evMap = {};
      evaluacionesData.forEach(ev => {
        evMap[ev.criterio_id] = ev.puntaje;
      });
      setEvaluaciones(evMap);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScore = async (criterioId, puntaje) => {
    try {
      setSaving(true);
      await apiService.guardarEvaluacion({
        proyecto_id: proyecto.id,
        criterio_id: criterioId,
        puntaje
      });

      // Actualizar estado local
      setEvaluaciones(prev => ({
        ...prev,
        [criterioId]: puntaje
      }));

      showToast('Evaluación guardada correctamente', 'success');
    } catch (error) {
      console.error('Error guardando evaluación:', error);
      showToast('Error al guardar la evaluación', 'error');
    } finally {
      setSaving(false);
    }
  };

  const showToast = (message, type) => {
    // Implementación simple de toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  if (loading) {
    return <div className="loading">Cargando evaluación...</div>;
  }

  return (
    <div className="evaluation-form">
      <div className="project-details">
        <h2>{proyecto.proyecto_musical}</h2>
        <p className="artist-name">{proyecto.nombre}</p>

        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Destino</span>
            <span className="detail-value">{proyecto.destino}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Género Musical</span>
            <span className="detail-value">{proyecto.genero_musical}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Ubicación</span>
            <span className="detail-value">{proyecto.ciudad}, {proyecto.provincia}</span>
          </div>
        </div>

        {(proyecto.otras_convocatorias > 0 || proyecto.solicitudes_otorgadas > 0) && (
          <div className="historial-convocatorias">
            <h4>
              <i className="fas fa-history"></i> Historial de Convocatorias
            </h4>
            <div className="historial-grid">
              <div className="historial-item">
                <div className="historial-icon presentaciones">
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="historial-info">
                  <span className="historial-label">Veces Presentado</span>
                  <span className="historial-value">{proyecto.otras_convocatorias || 0}</span>
                  <small className="historial-note">
                    Bonus: +{Math.floor((proyecto.otras_convocatorias || 0) / 3)} punto(s)
                  </small>
                </div>
              </div>
              <div className="historial-item">
                <div className="historial-icon premios">
                  <i className="fas fa-trophy"></i>
                </div>
                <div className="historial-info">
                  <span className="historial-label">Veces Ganador</span>
                  <span className="historial-value">{proyecto.solicitudes_otorgadas || 0}</span>
                  <small className="historial-note penalizacion">
                    Penalización: {proyecto.solicitudes_otorgadas ? `-${proyecto.solicitudes_otorgadas * 2}` : '0'} punto(s)
                  </small>
                </div>
              </div>
              <div className="historial-item ajuste-total">
                <div className="historial-icon ajuste">
                  <i className="fas fa-calculator"></i>
                </div>
                <div className="historial-info">
                  <span className="historial-label">Ajuste Total</span>
                  <span className={`historial-value ${
                    (Math.floor((proyecto.otras_convocatorias || 0) / 3) - ((proyecto.solicitudes_otorgadas || 0) * 2)) > 0 ? 'positive' :
                    (Math.floor((proyecto.otras_convocatorias || 0) / 3) - ((proyecto.solicitudes_otorgadas || 0) * 2)) < 0 ? 'negative' : ''
                  }`}>
                    {(Math.floor((proyecto.otras_convocatorias || 0) / 3) - ((proyecto.solicitudes_otorgadas || 0) * 2)) > 0 ? '+' : ''}
                    {Math.floor((proyecto.otras_convocatorias || 0) / 3) - ((proyecto.solicitudes_otorgadas || 0) * 2)} puntos
                  </span>
                  <small className="historial-note">
                    Se sumará al puntaje final
                  </small>
                </div>
              </div>
            </div>
          </div>
        )}

        {proyecto.antecedentes_artisticos && (
          <div className="detail-full">
            <span className="detail-label">
              <i className="fas fa-award"></i> Antecedentes Artísticos
            </span>
            <p className="detail-value">{proyecto.antecedentes_artisticos}</p>
          </div>
        )}

        {proyecto.sinopsis && (
          <div className="detail-full">
            <span className="detail-label">Sinopsis</span>
            <p className="detail-value">{proyecto.sinopsis}</p>
          </div>
        )}

        {(proyecto.link_audio || proyecto.link_audio2) && (
          <div className="detail-full">
            <span className="detail-label">
              <i className="fas fa-headphones"></i> Material de Audio
            </span>
            <div className="audio-links">
              {proyecto.link_audio && (() => {
                const platform = detectPlatform(proyecto.link_audio);
                return (
                  <a
                    href={proyecto.link_audio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="audio-link"
                    style={{ background: `linear-gradient(135deg, ${platform.color || '#667eea'} 0%, ${platform.color ? platform.color + 'cc' : '#764ba2'} 100%)` }}
                  >
                    <i className={platform.icon}></i>
                    <div className="audio-link-info">
                      <strong>{platform.name}</strong>
                      <small>{proyecto.link_audio}</small>
                    </div>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                );
              })()}
              {proyecto.link_audio2 && (() => {
                const platform = detectPlatform(proyecto.link_audio2);
                return (
                  <a
                    href={proyecto.link_audio2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="audio-link"
                    style={{ background: `linear-gradient(135deg, ${platform.color || '#667eea'} 0%, ${platform.color ? platform.color + 'cc' : '#764ba2'} 100%)` }}
                  >
                    <i className={platform.icon}></i>
                    <div className="audio-link-info">
                      <strong>{platform.name}</strong>
                      <small>{proyecto.link_audio2}</small>
                    </div>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      <div className="criteria-evaluation">
        <h3>
          <i className="fas fa-star"></i> Evaluación por Criterios
        </h3>

        {criterios.map(criterio => (
          <div key={criterio.id} className="criterion-group">
            <div className="criterion-header">
              <span className="criterion-name">{criterio.nombre}</span>
              <span className="criterion-weight">Peso: {criterio.peso}x</span>
            </div>
            <p className="criterion-description">{criterio.descripcion}</p>

            <div className="score-buttons">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                <button
                  key={score}
                  className={`score-btn ${evaluaciones[criterio.id] === score ? 'selected' : ''} ${score <= 4 ? 'low' : score >= 8 ? 'high' : ''}`}
                  onClick={() => handleScore(criterio.id, score)}
                  disabled={saving}
                >
                  {score}
                </button>
              ))}
            </div>

            <div className="current-score">
              {evaluaciones[criterio.id] ?
                <span>Puntuación actual: <strong>{evaluaciones[criterio.id]}/10</strong></span> :
                <span className="no-score">Sin puntuar</span>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
