// ============================================================
// Constantes para el módulo de Estaciones de Servicio
// ============================================================
// El padrón de estaciones de servicio se puede descargar desde:
// https://datos.gob.ar/dataset/energia-precios-combustibles
// Guardá el archivo como "estaciones.csv" en la carpeta clase-2
// ============================================================

const path = require('path');

// Ruta al archivo CSV de estaciones
const RUTA_CSV = path.join(__dirname, '..', '..', '..', 'estaciones.csv');

module.exports = {
    RUTA_CSV
};
