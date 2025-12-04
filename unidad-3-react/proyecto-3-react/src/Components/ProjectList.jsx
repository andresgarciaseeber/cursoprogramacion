/**
 * Componente: Lista de Proyectos Musicales
 */

import { useState, useEffect } from 'react';
import apiService from '../services/api';
import './ProjectList.css';

export default function ProjectList({ onSelectProject }) {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    nombre: '',
    destino: '',
    rubros: ''
  });

  useEffect(() => {
    loadProyectos();
  }, []);

  const loadProyectos = async () => {
    try {
      setLoading(true);
      const data = await apiService.getProyectos(filtros);
      setProyectos(data);
    } catch (error) {
      console.error('Error cargando proyectos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    await loadProyectos();
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Cargando proyectos...</p>
      </div>
    );
  }

  return (
    <div className="project-list-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtros.nombre}
          onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
          onKeyUp={(e) => e.key === 'Enter' && handleFilter()}
        />
        <select
          value={filtros.destino}
          onChange={(e) => {
            setFiltros({ ...filtros, destino: e.target.value });
            handleFilter();
          }}
        >
          <option value="">Todos los destinos</option>
          <option value="INAMU">INAMU</option>
          <option value="Otro">Otro</option>
        </select>
        <button onClick={handleFilter} className="btn-filter">
          Filtrar
        </button>
      </div>

      <div className="projects-grid">
        {proyectos.length === 0 ? (
          <p className="no-results">No se encontraron proyectos</p>
        ) : (
          proyectos.map(proyecto => (
            <div
              key={proyecto.id}
              className="project-card"
              onClick={() => onSelectProject(proyecto)}
            >
              <div className="project-header">
                <h3 className="project-name">{proyecto.nombre}</h3>
                <p className="project-musical">{proyecto.proyecto_musical}</p>
              </div>

              {proyecto.antecedentes_artisticos && (
                <div className="project-antecedentes">
                  <i className="fas fa-award"></i>
                  <span>{proyecto.antecedentes_artisticos.substring(0, 100)}...</span>
                </div>
              )}

              <div className="project-meta">
                <span className="meta-tag">
                  <i className="fas fa-tag"></i> {proyecto.destino}
                </span>
                <span className="meta-tag">
                  <i className="fas fa-music"></i> {proyecto.genero_musical}
                </span>
                <span className="meta-tag">
                  <i className="fas fa-map-marker-alt"></i> {proyecto.ciudad}, {proyecto.provincia}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="project-count">
        {proyectos.length} proyecto{proyectos.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
