/**
 * Componente: Métricas de Redes Sociales
 * Muestra estadísticas de presencia digital del proyecto musical
 */

import { useState, useEffect } from 'react';
import socialMetricsService from '../services/socialMetrics';
import './SocialMetrics.css';

export default function SocialMetrics({ proyecto }) {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [digitalScore, setDigitalScore] = useState(0);

  useEffect(() => {
    analyzeProject();
  }, [proyecto]);

  const analyzeProject = async () => {
    setLoading(true);
    try {
      const links = [proyecto.link_audio, proyecto.link_audio2].filter(Boolean);

      if (links.length === 0) {
        setMetrics([]);
        setDigitalScore(0);
        return;
      }

      const results = await socialMetricsService.analyzeMultipleLinks(links);
      setMetrics(results);

      const score = socialMetricsService.calculateDigitalPresenceScore(results);
      setDigitalScore(score);

    } catch (error) {
      console.error('Error analizando métricas:', error);
      setMetrics([]);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#2ecc71';
    if (score >= 60) return '#3498db';
    if (score >= 40) return '#f39c12';
    return '#e74c3c';
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'YouTube': 'fa-brands fa-youtube',
      'Spotify': 'fa-brands fa-spotify',
      'SoundCloud': 'fa-brands fa-soundcloud',
      'Instagram': 'fa-brands fa-instagram',
      'Bandcamp': 'fa-brands fa-bandcamp'
    };
    return icons[platform] || 'fa-music';
  };

  if (loading) {
    return (
      <div className="social-metrics loading">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Analizando presencia digital...</p>
      </div>
    );
  }

  if (metrics.length === 0) {
    return (
      <div className="social-metrics empty">
        <i className="fas fa-info-circle"></i>
        <p>No se encontraron enlaces para analizar</p>
      </div>
    );
  }

  return (
    <div className="social-metrics">
      <div className="metrics-header">
        <h3>
          <i className="fas fa-chart-line"></i> Presencia Digital
        </h3>
        <div className="digital-score">
          <div className="score-circle" style={{ '--score-color': getScoreColor(digitalScore) }}>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="score-bg"></circle>
              <circle
                cx="50"
                cy="50"
                r="45"
                className="score-fill"
                style={{
                  strokeDashoffset: `${283 - (283 * digitalScore) / 100}`,
                  stroke: getScoreColor(digitalScore)
                }}
              ></circle>
            </svg>
            <div className="score-value">{digitalScore}</div>
          </div>
          <span className="score-label">Score Digital</span>
        </div>
      </div>

      <div className="platforms-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="platform-card">
            <div className="platform-header">
              <i className={getPlatformIcon(metric.platform)}></i>
              <h4>{metric.platform}</h4>
              {metric.hasDetailedStats && (
                <span className="verified-badge" title="Información verificada">
                  <i className="fas fa-check-circle"></i>
                </span>
              )}
            </div>

            <div className="platform-info">
              {metric.title && (
                <div className="info-item">
                  <span className="info-label">Título:</span>
                  <span className="info-value">{metric.title}</span>
                </div>
              )}

              {metric.author && (
                <div className="info-item">
                  <span className="info-label">Artista:</span>
                  <span className="info-value">{metric.author}</span>
                </div>
              )}

              {metric.username && (
                <div className="info-item">
                  <span className="info-label">Usuario:</span>
                  <span className="info-value">@{metric.username}</span>
                </div>
              )}

              {metric.type && (
                <div className="info-item">
                  <span className="info-label">Tipo:</span>
                  <span className="info-value">{metric.type}</span>
                </div>
              )}

              {metric.thumbnail && (
                <div className="platform-thumbnail">
                  <img src={metric.thumbnail} alt={metric.title} />
                </div>
              )}

              {metric.note && (
                <div className="info-note">
                  <i className="fas fa-info-circle"></i>
                  <small>{metric.note}</small>
                </div>
              )}

              <a
                href={metric.url}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-link"
              >
                Ver en {metric.platform} <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="api-info">
        <div className="info-box info-warning">
          <i className="fas fa-key"></i>
          <div>
            <strong>Métricas Detalladas Disponibles con APIs</strong>
            <p>
              Para obtener estadísticas completas (oyentes mensuales, seguidores, reproducciones),
              se requieren claves de API de:
            </p>
            <ul>
              <li><strong>Spotify Web API:</strong> Oyentes mensuales, popularidad del artista</li>
              <li><strong>YouTube Data API v3:</strong> Vistas, likes, suscriptores del canal</li>
              <li><strong>Instagram Graph API:</strong> Seguidores, engagement, publicaciones</li>
              <li><strong>SoundCloud API:</strong> Reproducciones, favoritos, comentarios</li>
            </ul>
          </div>
        </div>

        <div className="info-box info-success">
          <i className="fas fa-lightbulb"></i>
          <div>
            <strong>Información Actual</strong>
            <p>
              El sistema actualmente muestra información pública disponible sin autenticación.
              Para implementar métricas completas, necesitarás registrarte en las plataformas
              de desarrolladores y obtener las credenciales necesarias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
