/**
 * Sistema de Evaluación de Proyectos Musicales - ENACOM
 * Aplicación principal en React
 */

import { useState } from 'react';
import ProjectList from './Components/ProjectList';
import EvaluationForm from './Components/EvaluationForm';
import Ranking from './Components/Ranking';
import ImageAnalyzer from './Components/ImageAnalyzer';
import SocialMetrics from './Components/SocialMetrics';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('evaluation');
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectProject = (proyecto) => {
    setSelectedProject(proyecto);
    setCurrentView('evaluation');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <i className="fas fa-guitar"></i>
            Sistema de Evaluación de Proyectos Musicales
          </h1>
          <p className="header-subtitle">UMI - Instituto Nacional de la Música</p>
        </div>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${currentView === 'evaluation' ? 'active' : ''}`}
          onClick={() => setCurrentView('evaluation')}
        >
          <i className="fas fa-star"></i>
          Evaluación
        </button>
        <button
          className={`nav-btn ${currentView === 'ranking' ? 'active' : ''}`}
          onClick={() => setCurrentView('ranking')}
        >
          <i className="fas fa-trophy"></i>
          Ranking
        </button>
      </nav>

      <main className="app-main">
        {currentView === 'evaluation' && (
          <div className="evaluation-layout">
            <aside className="sidebar">
              <ProjectList onSelectProject={handleSelectProject} />
            </aside>

            <section className="content">
              {selectedProject ? (
                <>
                  <SocialMetrics proyecto={selectedProject} />
                  <EvaluationForm proyecto={selectedProject} />
                  <ImageAnalyzer proyecto={selectedProject} />
                </>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-hand-pointer"></i>
                  <h2>Selecciona un proyecto</h2>
                  <p>Elige un proyecto de la lista para comenzar la evaluación</p>
                </div>
              )}
            </section>
          </div>
        )}

        {currentView === 'ranking' && (
          <Ranking />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 ENACOM - Sistema de Evaluación de Proyectos Musicales</p>
        <p className="footer-tech">
          Desarrollado con React + TensorFlow.js
        </p>
      </footer>
    </div>
  );
}

export default App;
