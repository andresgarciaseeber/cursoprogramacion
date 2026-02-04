// ============================================================
// Servicios para el módulo de Estaciones de Ferrocarril
// ============================================================

const fs = require('fs');
const { RUTA_CSV_FFCC, COLORES_LINEAS } = require('./ferrocarriles.constants');

/**
 * Parsea el contenido del CSV a un array de objetos
 * @param {string} contenido - Contenido del archivo CSV
 * @returns {Array} Array de estaciones
 */
function parsearCSV(contenido) {
    const lineas = contenido.split('\n');
    const encabezados = lineas[0].split(',').map(h => h.trim());

    const datos = [];
    for (let i = 1; i < lineas.length; i++) {
        if (lineas[i].trim() === '') continue;

        // Parseo simple por comas (funciona para este CSV)
        const valores = lineas[i].split(',');
        const objeto = {};

        encabezados.forEach((encabezado, index) => {
            objeto[encabezado] = valores[index]?.trim() || '';
        });

        datos.push(objeto);
    }
    return datos;
}

/**
 * Lee las estaciones de ferrocarril desde el CSV
 * @returns {Array|null} Lista de estaciones o null si no existe
 */
function leerEstacionesFfcc() {
    if (!fs.existsSync(RUTA_CSV_FFCC)) {
        console.log('No se encontró el archivo de estaciones de ferrocarril');
        return null;
    }
    const contenido = fs.readFileSync(RUTA_CSV_FFCC, 'utf-8');
    return parsearCSV(contenido);
}

/**
 * Filtra estaciones por línea de ferrocarril
 * @param {Array} estaciones
 * @param {string} linea
 * @returns {Array}
 */
function filtrarPorLinea(estaciones, linea) {
    return estaciones.filter(est =>
        est['línea']?.toLowerCase().includes(linea.toLowerCase())
    );
}

/**
 * Filtra estaciones por operador (SOFSE, FEPSA, etc.)
 * @param {Array} estaciones
 * @param {string} operador
 * @returns {Array}
 */
function filtrarPorOperador(estaciones, operador) {
    return estaciones.filter(est =>
        est.caa?.toLowerCase().includes(operador.toLowerCase())
    );
}

/**
 * Obtiene las líneas únicas disponibles
 * @param {Array} estaciones
 * @returns {Array}
 */
function obtenerLineas(estaciones) {
    const lineas = new Set();
    estaciones.forEach(est => {
        if (est['línea']) lineas.add(est['línea']);
    });
    return Array.from(lineas).sort();
}

/**
 * Obtiene los operadores únicos disponibles
 * @param {Array} estaciones
 * @returns {Array}
 */
function obtenerOperadores(estaciones) {
    const operadores = new Set();
    estaciones.forEach(est => {
        if (est.caa) operadores.add(est.caa);
    });
    return Array.from(operadores).sort();
}

/**
 * Obtiene el color correspondiente a una línea
 * @param {string} linea
 * @returns {string}
 */
function obtenerColorLinea(linea) {
    return COLORES_LINEAS[linea] || COLORES_LINEAS['default'];
}

/**
 * Genera el HTML de una estación individual
 * @param {Object} estacion
 * @returns {string}
 */
function generarHTMLEstacion(estacion) {
    const nombre = estacion.nam || estacion.fna || 'Sin nombre';
    const linea = estacion['línea'] || 'Sin línea';
    const operador = estacion.caa || 'Sin operador';
    const colorLinea = obtenerColorLinea(linea);
    const lat = estacion.lat || '';
    const long = estacion.long || '';

    // Generar enlace a Google Maps si hay coordenadas
    let enlaceMapa = '';
    if (lat && long) {
        const urlMaps = `https://www.google.com/maps?q=${lat},${long}`;
        enlaceMapa = `<a href="${urlMaps}" target="_blank" class="ver-mapa">Ver en mapa</a>`;
    }

    return `
    <div class="estacion" style="border-left-color: ${colorLinea}">
        <div class="nombre">${nombre}</div>
        <span class="linea" style="background: ${colorLinea}">${linea}</span>
        <div class="info">
            <span><strong>Operador:</strong> ${operador}</span>
            ${estacion.progresiva ? `<span><strong>Km:</strong> ${estacion.progresiva}</span>` : ''}
        </div>
        ${enlaceMapa}
    </div>
    `;
}

/**
 * Muestra estadísticas por consola
 * @param {Array} estaciones
 */
function mostrarEstadisticasConsola(estaciones) {
    console.log('\n===========================================');
    console.log('  Estaciones de Ferrocarril de Argentina');
    console.log('===========================================\n');

    console.log('Total estaciones:', estaciones.length);

    const lineas = obtenerLineas(estaciones);
    console.log('\nLíneas disponibles:');
    lineas.forEach(linea => {
        const cantidad = filtrarPorLinea(estaciones, linea).length;
        console.log(`  - ${linea}: ${cantidad} estaciones`);
    });
}

module.exports = {
    parsearCSV,
    leerEstacionesFfcc,
    filtrarPorLinea,
    filtrarPorOperador,
    obtenerLineas,
    obtenerOperadores,
    obtenerColorLinea,
    generarHTMLEstacion,
    mostrarEstadisticasConsola
};
