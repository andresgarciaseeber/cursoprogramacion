// ============================================================
// JSON (JavaScript Object Notation)
// ============================================================
// JSON es un formato ligero de intercambio de datos, fácil de leer
// y escribir para humanos, y fácil de parsear y generar para máquinas.
// Se basa en la sintaxis de objetos de JavaScript pero es independiente
// del lenguaje, por lo que se usa en prácticamente todos los lenguajes.
//
// En Node.js trabajamos con JSON usando dos métodos principales:
// - JSON.parse(string): convierte un string JSON en un objeto JavaScript
// - JSON.stringify(objeto): convierte un objeto JavaScript en string JSON
// Estos métodos son fundamentales para leer archivos de configuración,
// comunicarse con APIs y almacenar datos estructurados.
//
// JSON solo admite tipos básicos: strings, números, booleanos, null,
// arrays y objetos. No soporta funciones, fechas (se pasan como string),
// ni valores undefined. Es el estándar para intercambio de datos en la web.
// ============================================================

// ============================================================
// FileSystem (fs)
// ============================================================
// El módulo 'fs' (File System) es un módulo nativo de Node.js que permite
// interactuar con el sistema de archivos del servidor. Podemos crear,
// leer, actualizar y eliminar archivos y directorios. Es una de las
// capacidades más poderosas que Node.js ofrece frente al JavaScript del navegador.
//
// Existen dos formas de usar fs: síncrona y asíncrona. Los métodos síncronos
// (como readFileSync, writeFileSync) bloquean la ejecución hasta completarse.
// Los métodos asíncronos usan callbacks o promesas y no bloquean el hilo
// principal, lo cual es preferible en aplicaciones con muchas operaciones I/O.
//
// También existe 'fs/promises' que nos permite usar async/await para un
// código más limpio y moderno. En producción se recomienda siempre usar
// métodos asíncronos para no bloquear el event loop de Node.js.
// ============================================================

// ============================================================
// Módulo OS (Operating System)
// ============================================================
// El módulo 'os' proporciona métodos y propiedades para obtener información
// sobre el sistema operativo donde se ejecuta Node.js. Podemos conocer
// la arquitectura del CPU, la memoria disponible, el directorio home
// del usuario, información de red, y mucho más.
//
// Es muy útil para crear aplicaciones que necesitan adaptarse al entorno
// donde se ejecutan, como detectar si estamos en Windows, Linux o Mac,
// conocer cuántos núcleos de CPU hay disponibles para optimizar procesos,
// o saber cuánta memoria RAM tiene el sistema para gestionar recursos.
//
// Algunos métodos comunes son: os.platform(), os.arch(), os.cpus(),
// os.totalmem(), os.freemem(), os.homedir(), os.hostname() y os.networkInterfaces().
// Este módulo es nativo, no requiere instalación con npm.
// ============================================================

// ============================================================
// Plataformas de Despliegue (Vercel, Render, Railway, etc.)
// ============================================================
// Una vez que desarrollamos nuestra aplicación Node.js en local, necesitamos
// desplegarla en un servidor para que sea accesible desde internet. Existen
// varias plataformas cloud que facilitan este proceso, cada una con sus
// características y casos de uso específicos.
//
// VERCEL: Plataforma optimizada para frontend y funciones serverless. Es ideal
// para proyectos con Next.js, React, Vue, etc. Ofrece despliegue automático
// desde GitHub, dominio gratuito, SSL automático y un generoso tier gratuito.
// Las funciones serverless se ejecutan bajo demanda, no hay servidor corriendo 24/7.
//
// RENDER: Alternativa moderna a Heroku, permite desplegar aplicaciones Node.js
// completas (servidores Express, APIs REST, etc.). Ofrece bases de datos,
// servicios en background, y tier gratuito. Ideal para backends tradicionales.
//
// RAILWAY: Similar a Render, muy fácil de usar con buena integración con GitHub.
// Permite desplegar cualquier tipo de aplicación Node.js con bases de datos
// incluidas. Interfaz moderna y proceso de deploy muy simplificado.
//
// HEROKU: Fue pionera en PaaS (Platform as a Service). Aunque eliminó su tier
// gratuito, sigue siendo popular en entornos empresariales por su madurez
// y ecosistema de addons para bases de datos, caché, monitoring, etc.
//
// OTROS: Fly.io (servidores edge), DigitalOcean App Platform, AWS Lambda,
// Google Cloud Functions, Azure Functions, Netlify Functions, etc.
// ============================================================

// ============================================================
// IMPORTACIÓN DE MÓDULOS
// ============================================================

const fs = require('fs');
const path = require('path');
const http = require('http');

// Importar servicios y constantes de reportes
const { PORT, ESTILOS_CSS } = require('./services/reportes/reportes.constants');
const {
    leerReportes,
    mostrarReportesConsola,
    generarHTMLReporte
} = require('./services/reportes/reportes.services');

// Importar servicios de estaciones (opcional, si tenés el CSV)
const { leerEstaciones, mostrarEstadisticas } = require('./services/estaciones/estaciones.services');

// Importar generador de reportes
const { procesarReportes, leerParaReportar } = require('./services/reportes/reportes.generator');

// ============================================================
// EJEMPLO PRÁCTICO: Leer package.json con fs
// ============================================================

const rutaPackage = path.join(__dirname, '..', 'package.json');

console.log('===========================================');
console.log('  Leyendo package.json con FileSystem (fs)');
console.log('===========================================\n');

const contenido = fs.readFileSync(rutaPackage, 'utf-8');
const packageData = JSON.parse(contenido);

console.log('Nombre del proyecto:', packageData.name);
console.log('Version:', packageData.version);
console.log('Descripcion:', packageData.description);
console.log('Archivo principal:', packageData.main);
console.log('Autor:', packageData.author || 'No especificado');
console.log('Licencia:', packageData.license);

console.log('\nScripts disponibles:');
for (const [nombre, comando] of Object.entries(packageData.scripts)) {
    console.log(`  - npm run ${nombre}: ${comando}`);
}

console.log('\nKeywords:', packageData.keywords?.join(', ') || 'No especificadas');

console.log('\n--- Objeto completo ---');
console.log(packageData);

// ============================================================
// EJEMPLO PRÁCTICO: Leer reportes.json usando servicios
// ============================================================

const reportes = leerReportes();
mostrarReportesConsola(reportes);

// ============================================================
// EJEMPLO OPCIONAL: Leer estaciones de servicio (si existe el CSV)
// ============================================================

const estaciones = leerEstaciones();
if (estaciones) {
    mostrarEstadisticas(estaciones);
}

// ============================================================
// SERVIDOR HTTP: Ver reportes en el navegador
// ============================================================

const url = require('url');

const servidor = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Endpoint para procesar reportes pendientes
    if (parsedUrl.pathname === '/actualizar' && req.method === 'POST') {
        const pendientes = leerParaReportar();
        if (pendientes.length === 0) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, mensaje: 'No hay reportes pendientes' }));
            return;
        }

        const resultado = procesarReportes();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            success: true,
            mensaje: `Se agregaron ${resultado.nuevos} reportes. Total: ${resultado.total}`
        }));
        return;
    }

    // Leer reportes en cada petición para ver cambios en tiempo real
    const listaReportes = leerReportes();
    const pendientes = leerParaReportar();

    // Generar HTML con los reportes
    let html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Reportes - Clase 2 Node.js</title>
        <style>
            ${ESTILOS_CSS}
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
            .btn-actualizar {
                padding: 12px 24px;
                background: #28a745;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 1em;
                cursor: pointer;
                transition: background 0.3s;
            }
            .btn-actualizar:hover { background: #218838; }
            .btn-actualizar:disabled { background: #ccc; cursor: not-allowed; }
            .pendientes {
                background: #fff3cd;
                padding: 10px 15px;
                border-radius: 6px;
                color: #856404;
                margin-bottom: 15px;
            }
            .mensaje {
                padding: 10px 15px;
                border-radius: 6px;
                margin-bottom: 15px;
                display: none;
            }
            .mensaje.success { background: #d4edda; color: #155724; display: block; }
            .mensaje.error { background: #f8d7da; color: #721c24; display: block; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Lista de Reportes (${listaReportes.length})</h1>
            <button class="btn-actualizar" onclick="actualizarReportes()" ${pendientes.length === 0 ? 'disabled' : ''}>
                Actualizar Reportes (${pendientes.length} pendientes)
            </button>
        </div>

        ${pendientes.length > 0 ? `
        <div class="pendientes">
            Hay ${pendientes.length} reportes pendientes en para-reportar.json listos para procesar
        </div>
        ` : ''}

        <div id="mensaje" class="mensaje"></div>
    `;

    listaReportes.forEach(reporte => {
        html += generarHTMLReporte(reporte);
    });

    html += `
        <script>
            async function actualizarReportes() {
                const btn = document.querySelector('.btn-actualizar');
                const mensaje = document.getElementById('mensaje');
                btn.disabled = true;
                btn.textContent = 'Procesando...';

                try {
                    const response = await fetch('/actualizar', { method: 'POST' });
                    const data = await response.json();

                    mensaje.className = 'mensaje ' + (data.success ? 'success' : 'error');
                    mensaje.textContent = data.mensaje;

                    if (data.success) {
                        setTimeout(() => location.reload(), 1500);
                    } else {
                        btn.disabled = false;
                        btn.textContent = 'Actualizar Reportes (0 pendientes)';
                    }
                } catch (error) {
                    mensaje.className = 'mensaje error';
                    mensaje.textContent = 'Error al procesar: ' + error.message;
                    btn.disabled = false;
                }
            }
        </script>
    </body>
    </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
});

servidor.listen(PORT, () => {
    console.log(`\nServidor corriendo en http://localhost:${PORT}`);
    console.log('Abrí el navegador para ver los reportes');
});
