// ============================================================
// Servicios para el módulo de Estaciones de Servicio
// ============================================================
// Este módulo permite leer y filtrar estaciones de servicio
// desde un archivo CSV descargado de datos.gob.ar
// ============================================================

const fs = require('fs');
const { RUTA_CSV } = require('./estaciones.constants');

/**
 * Parsea el contenido de un CSV a un array de objetos
 * @param {string} contenido - Contenido del archivo CSV
 * @returns {Array} Array de objetos con los datos
 */
function parsearCSV(contenido) {
    const lineas = contenido.split('\n');
    const encabezados = lineas[0].split(',').map(h => h.trim().replace(/"/g, ''));

    const datos = [];
    for (let i = 1; i < lineas.length; i++) {
        if (lineas[i].trim() === '') continue;
        const valores = lineas[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
        const objeto = {};
        encabezados.forEach((encabezado, index) => {
            let valor = valores[index] || '';
            valor = valor.replace(/^"|"$/g, '').trim();
            objeto[encabezado] = valor;
        });
        datos.push(objeto);
    }
    return datos;
}

/**
 * Lee las estaciones desde el archivo CSV
 * @returns {Array|null} Lista de estaciones o null si no existe el archivo
 */
function leerEstaciones() {
    if (!fs.existsSync(RUTA_CSV)) {
        console.log('No se encontró el archivo estaciones.csv');
        console.log('Descargalo desde: https://datos.gob.ar/dataset/energia-precios-combustibles');
        return null;
    }
    const contenido = fs.readFileSync(RUTA_CSV, 'utf-8');
    return parsearCSV(contenido);
}

/**
 * Filtra estaciones por provincia
 * @param {Array} estaciones - Lista de estaciones
 * @param {string} provincia - Nombre de la provincia a filtrar
 * @returns {Array} Estaciones filtradas
 */
function filtrarPorProvincia(estaciones, provincia) {
    return estaciones.filter(estacion =>
        estacion.provincia?.toLowerCase().includes(provincia.toLowerCase())
    );
}

/**
 * Filtra estaciones por empresa/bandera
 * @param {Array} estaciones - Lista de estaciones
 * @param {string} empresa - Nombre de la empresa a filtrar
 * @returns {Array} Estaciones filtradas
 */
function filtrarPorEmpresa(estaciones, empresa) {
    return estaciones.filter(estacion =>
        estacion.empresabandera?.toLowerCase().includes(empresa.toLowerCase()) ||
        estacion.empresa?.toLowerCase().includes(empresa.toLowerCase())
    );
}

/**
 * Muestra estadísticas de estaciones por consola
 * @param {Array} estaciones - Lista de estaciones
 */
function mostrarEstadisticas(estaciones) {
    if (!estaciones) return;

    console.log('\n===========================================');
    console.log('  Estadísticas de Estaciones de Servicio');
    console.log('===========================================\n');

    console.log('Total estaciones:', estaciones.length);

    const bsAs = filtrarPorProvincia(estaciones, 'Buenos Aires');
    console.log('Estaciones en Buenos Aires:', bsAs.length);
}

module.exports = {
    parsearCSV,
    leerEstaciones,
    filtrarPorProvincia,
    filtrarPorEmpresa,
    mostrarEstadisticas
};
