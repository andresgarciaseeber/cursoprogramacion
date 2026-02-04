// ============================================================
// Servidor HTTP para visualizar Estaciones de Ferrocarril
// ============================================================
// Ejecutar con: node src/ferrocarriles.js
// Abrir en el navegador: http://localhost:3001
// ============================================================

const http = require('http');
const url = require('url');

const { PORT_FFCC, ESTILOS_CSS_FFCC } = require('./services/ferrocarriles/ferrocarriles.constants');
const {
    leerEstacionesFfcc,
    filtrarPorLinea,
    obtenerLineas,
    obtenerOperadores,
    generarHTMLEstacion,
    mostrarEstadisticasConsola
} = require('./services/ferrocarriles/ferrocarriles.services');

// Cargar estaciones al iniciar
const todasLasEstaciones = leerEstacionesFfcc();

if (!todasLasEstaciones) {
    console.log('No se pudo cargar el archivo de estaciones');
    process.exit(1);
}

// Mostrar estadísticas en consola
mostrarEstadisticasConsola(todasLasEstaciones);

// Obtener líneas y operadores para los filtros
const lineasDisponibles = obtenerLineas(todasLasEstaciones);
const operadoresDisponibles = obtenerOperadores(todasLasEstaciones);

// Crear servidor
const servidor = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const lineaFiltro = parsedUrl.query.linea || '';

    // Filtrar estaciones según parámetros
    let estacionesFiltradas = todasLasEstaciones;
    if (lineaFiltro) {
        estacionesFiltradas = filtrarPorLinea(todasLasEstaciones, lineaFiltro);
    }

    // Generar opciones del select
    const opcionesLineas = lineasDisponibles.map(linea =>
        `<option value="${linea}" ${linea === lineaFiltro ? 'selected' : ''}>${linea}</option>`
    ).join('');

    // Generar HTML
    let html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Estaciones de Ferrocarril - Argentina</title>
        <style>${ESTILOS_CSS_FFCC}</style>
    </head>
    <body>
        <div class="container">
            <h1>Estaciones de Ferrocarril de Argentina</h1>
            <p class="stats">Total: ${todasLasEstaciones.length} estaciones | Mostrando: ${estacionesFiltradas.length}</p>

            <div class="filtros">
                <form method="GET">
                    <select name="linea" onchange="this.form.submit()">
                        <option value="">Todas las líneas</option>
                        ${opcionesLineas}
                    </select>
                </form>
            </div>

            <div class="grid">
    `;

    // Agregar estaciones (limitar a 100 para rendimiento)
    const estacionesAMostrar = estacionesFiltradas.slice(0, 100);
    estacionesAMostrar.forEach(estacion => {
        html += generarHTMLEstacion(estacion);
    });

    if (estacionesFiltradas.length > 100) {
        html += `<div class="estacion" style="text-align: center; grid-column: 1 / -1;">
            <p>Mostrando primeras 100 de ${estacionesFiltradas.length} estaciones. Usá el filtro para ver más.</p>
        </div>`;
    }

    html += `
            </div>
        </div>
    </body>
    </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
});

servidor.listen(PORT_FFCC, () => {
    console.log(`\nServidor de Ferrocarriles corriendo en http://localhost:${PORT_FFCC}`);
    console.log('Abrí el navegador para ver las estaciones');
});
