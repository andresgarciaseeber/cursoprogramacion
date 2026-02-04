// ============================================================
// Constantes para el módulo de Reportes
// ============================================================

const path = require('path');

// Versión actual del sistema de reportes
const VERSION_ACTUAL = '1.1.2';

// Puerto del servidor HTTP
const PORT = 3000;

// Ruta al archivo de reportes
const RUTA_REPORTES = path.join(__dirname, '..', '..', '..', '..', 'reportes.json');

// Estilos CSS para el HTML
const ESTILOS_CSS = `
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    h1 { color: #333; }
    .reporte { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #007bff; }
    .reporte.version-antigua { border-left-color: #ffc107; background: #fff8e1; }
    .reporte.version-actual { border-left-color: #28a745; background: #e8f5e9; }
    .id { font-weight: bold; color: #007bff; }
    .puntuacion { color: #28a745; font-size: 1.2em; }
    .observaciones { color: #666; font-style: italic; }
    .version { font-size: 0.9em; color: #888; }
    .version.antigua { color: #856404; }
    .version.actual { color: #155724; }
`;

module.exports = {
    VERSION_ACTUAL,
    PORT,
    RUTA_REPORTES,
    ESTILOS_CSS
};
