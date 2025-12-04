/**
 * Componente: Ranking de Proyectos Musicales
 */

import { useState, useEffect } from 'react';
import apiService from '../services/api';
import './Ranking.css';

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    loadRanking();
  }, [limit]);

  const loadRanking = async () => {
    try {
      setLoading(true);
      const data = await apiService.getRanking(limit);
      setRanking(data);
    } catch (error) {
      console.error('Error cargando ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreClass = (score) => {
    if (score >= 8) return 'score-high';
    if (score >= 6) return 'score-medium';
    if (score > 0) return 'score-low';
    return 'score-none';
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Cargando ranking...</p>
      </div>
    );
  }

  return (
    <div className="ranking-container">
      <div className="ranking-header">
        <h2>
          <i className="fas fa-trophy"></i> Ranking de Proyectos
        </h2>
        <div className="ranking-controls">
          <label>
            Mostrar:
            <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
              <option value={10}>Top 10</option>
              <option value={25}>Top 25</option>
              <option value={50}>Top 50</option>
              <option value={100}>Top 100</option>
            </select>
          </label>
        </div>
      </div>

      <div className="ranking-table-container">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Proyecto Musical</th>
              <th>Artista</th>
              <th>Ubicación</th>
              <th>Puntaje Base</th>
              <th>Ajuste Historial</th>
              <th>Puntaje Final</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((proyecto, index) => (
              <tr key={proyecto.id} className={`ranking-row ${index < 3 ? 'top-three' : ''}`}>
                <td className="ranking-position">
                  {index + 1}
                  {index === 0 && <i className="fas fa-crown gold"></i>}
                  {index === 1 && <i className="fas fa-medal silver"></i>}
                  {index === 2 && <i className="fas fa-medal bronze"></i>}
                </td>
                <td>
                  <strong>{proyecto.proyecto_musical}</strong>
                  <br />
                  <small>{proyecto.genero_musical}</small>
                </td>
                <td>{proyecto.nombre}</td>
                <td>
                  {proyecto.ciudad}, {proyecto.provincia}
                </td>
                <td>
                  <span className={`score-badge ${getScoreClass(proyecto.puntaje_base || 0)}`}>
                    {(proyecto.puntaje_base && proyecto.puntaje_base > 0) ? Number(proyecto.puntaje_base).toFixed(2) : '-'}
                  </span>
                </td>
                <td>
                  <span className={`adjustment ${(proyecto.ajuste_historial || 0) > 0 ? 'positive' : (proyecto.ajuste_historial || 0) < 0 ? 'negative' : ''}`}>
                    {(proyecto.ajuste_historial || 0) > 0 ? '+' : ''}{Number(proyecto.ajuste_historial || 0).toFixed(2)}
                  </span>
                  <br />
                  <small>
                    {proyecto.veces_presentado > 0 && `${proyecto.veces_presentado} presentaciones`}
                    {proyecto.veces_ganador > 0 && `, ${proyecto.veces_ganador} premios`}
                  </small>
                </td>
                <td>
                  <span className={`score-final ${getScoreClass(proyecto.puntaje_final || 0)}`}>
                    {(proyecto.puntaje_final && proyecto.puntaje_final > 0) ? Number(proyecto.puntaje_final).toFixed(2) : 'Sin evaluar'}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${proyecto.estado_evaluacion.toLowerCase()}`}>
                    {proyecto.estado_evaluacion}
                  </span>
                  <br />
                  <small>{proyecto.criterios_evaluados}/{proyecto.total_criterios} criterios</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ranking.length === 0 && (
        <div className="no-data">
          <i className="fas fa-info-circle"></i>
          <p>No hay proyectos evaluados aún</p>
        </div>
      )}
    </div>
  );
}
