// ============================================================
// Constantes para el módulo de Estaciones de Ferrocarril
// ============================================================

const path = require('path');

// Ruta al archivo CSV de estaciones de ferrocarril
const RUTA_CSV_FFCC = path.join(__dirname, '..', '..', 'Estacion_ffcc_serv_22.view.csv');

// Puerto para el servidor de ferrocarriles (diferente al de reportes)
const PORT_FFCC = 3001;

// Colores por línea de ferrocarril
const COLORES_LINEAS = {
    'Mitre': '#FFCC00',
    'Sarmiento': '#00A859',
    'Roca': '#0066B3',
    'San Martín': '#E31837',
    'FFCC Sarmiento': '#00A859',
    'FFCC San Martín': '#E31837',
    'Belgrano Norte': '#8DC63F',
    'Belgrano Sur': '#FF6600',
    'Urquiza': '#999999',
    'default': '#666666'
};

// Estilos CSS para la vista de ferrocarriles
const ESTILOS_CSS_FFCC = `
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background: #f0f2f5; }
    h1 { color: #333; text-align: center; margin-bottom: 10px; }
    .stats { text-align: center; color: #666; margin-bottom: 20px; }
    .filtros { text-align: center; margin-bottom: 20px; }
    .filtros select { padding: 8px 15px; font-size: 14px; border: 1px solid #ddd; border-radius: 5px; margin: 0 5px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; }
    .estacion { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-left: 4px solid #666; }
    .estacion .nombre { font-weight: bold; font-size: 1.1em; color: #333; margin-bottom: 5px; }
    .estacion .linea { display: inline-block; padding: 3px 8px; border-radius: 3px; font-size: 0.85em; color: white; margin-bottom: 8px; }
    .estacion .info { font-size: 0.9em; color: #666; }
    .estacion .info span { display: block; margin: 3px 0; }
    .estacion .ver-mapa { display: inline-block; margin-top: 10px; padding: 6px 12px; background: #4285f4; color: white; text-decoration: none; border-radius: 4px; font-size: 0.85em; }
    .estacion .ver-mapa:hover { background: #3367d6; }
`;

module.exports = {
    RUTA_CSV_FFCC,
    PORT_FFCC,
    COLORES_LINEAS,
    ESTILOS_CSS_FFCC
};
