// ============================================================
// Servicios para el módulo de Reportes
// ============================================================

const fs = require('fs');
const { RUTA_REPORTES, VERSION_ACTUAL } = require('./reportes.constants');

/**
 * Lee los reportes desde el archivo JSON
 * @returns {Array} Lista de reportes
 */
function leerReportes() {
    const contenido = fs.readFileSync(RUTA_REPORTES, 'utf-8');
    return JSON.parse(contenido);
}

/**
 * Obtiene la puntuación de un reporte (puede estar en score o result)
 * @param {Object} reporte
 * @returns {number|string} Puntuación del reporte
 */
function obtenerPuntuacion(reporte) {
    return reporte.score || reporte.result || 'No especificada';
}

/**
 * Obtiene las observaciones de un reporte (details puede ser string u objeto)
 * @param {Object} reporte
 * @returns {string} Observaciones del reporte
 */
function obtenerObservaciones(reporte) {
    if (typeof reporte.details === 'string') {
        return reporte.details;
    } else if (typeof reporte.details === 'object') {
        return reporte.details.text || JSON.stringify(reporte.details);
    }
    return 'Sin observaciones';
}

/**
 * Verifica si un reporte tiene la versión actual
 * @param {Object} reporte
 * @returns {boolean}
 */
function esVersionActual(reporte) {
    return reporte.version === VERSION_ACTUAL;
}

/**
 * Muestra los reportes por consola
 * @param {Array} reportes
 */
function mostrarReportesConsola(reportes) {
    console.log('\n===========================================');
    console.log('  Leyendo reportes.json');
    console.log('===========================================\n');

    reportes.forEach(reporte => {
        const puntuacion = obtenerPuntuacion(reporte);
        const observaciones = obtenerObservaciones(reporte);
        console.log(`El reporte con id ${reporte.id} tiene una puntuación ${puntuacion}, Observaciones: ${observaciones}`);
    });
}

/**
 * Genera el HTML de un reporte individual
 * @param {Object} reporte
 * @returns {string} HTML del reporte
 */
function generarHTMLReporte(reporte) {
    const puntuacion = obtenerPuntuacion(reporte);
    const observaciones = obtenerObservaciones(reporte);
    const version = reporte.version || 'Sin versión';
    const esActual = esVersionActual(reporte);
    const claseVersion = esActual ? 'version-actual' : 'version-antigua';
    const claseTextoVersion = esActual ? 'actual' : 'antigua';
    const estadoVersion = esActual ? '(Actual)' : '(Requiere actualización)';

    return `
    <div class="reporte ${claseVersion}">
        <p><span class="id">Reporte ID: ${reporte.id}</span></p>
        <p>Puntuación: <span class="puntuacion">${puntuacion}</span></p>
        <p class="observaciones">Observaciones: ${observaciones}</p>
        <p class="version ${claseTextoVersion}">Versión: ${version} ${estadoVersion}</p>
    </div>
    `;
}

module.exports = {
    leerReportes,
    obtenerPuntuacion,
    obtenerObservaciones,
    esVersionActual,
    mostrarReportesConsola,
    generarHTMLReporte
};
