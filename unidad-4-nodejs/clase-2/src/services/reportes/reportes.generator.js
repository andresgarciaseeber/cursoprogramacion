// ============================================================
// Generador de Reportes
// ============================================================
// Lee para-reportar.json y genera nuevos reportes
// agregándolos a la lista existente en reportes.json
// ============================================================

const fs = require('fs');
const path = require('path');

// Rutas a los archivos
const rutaParaReportar = path.join(__dirname, '..', '..', '..', 'para-reportar.json');
const rutaReportes = path.join(__dirname, '..', '..', '..', '..', 'reportes.json');
const rutaPackage = path.join(__dirname, '..', '..', '..', 'package.json');

/**
 * Obtiene el texto de evaluación según el puntaje
 * @param {number} score - Puntaje del reporte
 * @returns {string} Texto de evaluación
 */
function obtenerTextoEvaluacion(score) {
    if (score < 5) return 'Muy riesgoso';
    if (score < 7) return 'No recomendable';
    if (score < 8) return 'Aceptable';
    if (score < 9) return 'Recomendable';
    return 'Óptimo';
}

/**
 * Obtiene la versión del package.json
 * @returns {string} Versión del proyecto
 */
function obtenerVersion() {
    try {
        const packageData = JSON.parse(fs.readFileSync(rutaPackage, 'utf-8'));
        return packageData.version || '1.2.0';
    } catch {
        return '1.2.0';
    }
}

/**
 * Lee los reportes existentes
 * @returns {Array} Lista de reportes existentes
 */
function leerReportesExistentes() {
    try {
        const contenido = fs.readFileSync(rutaReportes, 'utf-8');
        return JSON.parse(contenido);
    } catch {
        return [];
    }
}

/**
 * Lee los elementos para reportar
 * @returns {Array} Lista de elementos a procesar
 */
function leerParaReportar() {
    try {
        const contenido = fs.readFileSync(rutaParaReportar, 'utf-8');
        return JSON.parse(contenido);
    } catch (error) {
        console.log('Error al leer para-reportar.json:', error.message);
        return [];
    }
}

/**
 * Genera nuevos reportes a partir de los elementos para reportar
 * @param {Array} paraReportar - Elementos a procesar
 * @param {number} ultimoId - Último ID existente
 * @returns {Array} Nuevos reportes generados
 */
function generarNuevosReportes(paraReportar, ultimoId) {
    const version = obtenerVersion();
    const nuevosReportes = [];

    paraReportar.forEach((elemento, index) => {
        const puntaje = elemento.puntaje || elemento.score || 0;
        const nuevoReporte = {
            id: ultimoId + index + 1,
            score: puntaje,
            details: {
                text: obtenerTextoEvaluacion(puntaje),
                code: 700
            },
            version: version
        };
        nuevosReportes.push(nuevoReporte);
    });

    return nuevosReportes;
}

/**
 * Guarda los reportes en el archivo
 * @param {Array} reportes - Lista completa de reportes
 */
function guardarReportes(reportes) {
    fs.writeFileSync(rutaReportes, JSON.stringify(reportes, null, 4));
}

/**
 * Limpia el archivo para-reportar.json después de procesar
 */
function limpiarParaReportar() {
    fs.writeFileSync(rutaParaReportar, '[]');
}

/**
 * Proceso principal: genera y agrega reportes
 */
function procesarReportes() {
    console.log('===========================================');
    console.log('  Generador de Reportes');
    console.log('===========================================\n');

    // Leer elementos para reportar
    const paraReportar = leerParaReportar();
    if (paraReportar.length === 0) {
        console.log('No hay elementos para reportar en para-reportar.json');
        return;
    }
    console.log(`Elementos para reportar: ${paraReportar.length}`);

    // Leer reportes existentes
    const reportesExistentes = leerReportesExistentes();
    console.log(`Reportes existentes: ${reportesExistentes.length}`);

    // Calcular último ID
    const ultimoId = reportesExistentes.reduce((max, r) => Math.max(max, r.id || 0), 0);
    console.log(`Último ID: ${ultimoId}`);

    // Generar nuevos reportes
    const nuevosReportes = generarNuevosReportes(paraReportar, ultimoId);
    console.log(`\nNuevos reportes generados: ${nuevosReportes.length}`);

    nuevosReportes.forEach(reporte => {
        console.log(`  - ID ${reporte.id}: ${reporte.result} puntos -> ${reporte.details.text}`);
    });

    // Combinar y guardar
    const todosLosReportes = [...reportesExistentes, ...nuevosReportes];
    guardarReportes(todosLosReportes);

    // Limpiar archivo para-reportar.json
    limpiarParaReportar();

    console.log(`\nTotal de reportes guardados: ${todosLosReportes.length}`);
    console.log('Reportes guardados exitosamente en reportes.json');
    console.log('Archivo para-reportar.json limpiado');

    return { nuevos: nuevosReportes.length, total: todosLosReportes.length };
}

// Ejecutar si se llama directamente
if (require.main === module) {
    procesarReportes();
}

module.exports = {
    obtenerTextoEvaluacion,
    generarNuevosReportes,
    procesarReportes,
    leerParaReportar,
    leerReportesExistentes,
    limpiarParaReportar
};
