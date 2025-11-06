let model = null;
let currentImageBlob = null;

const fileInput = document.getElementById('file-input');
const uploadSection = document.getElementById('upload-section');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const executeButton = document.getElementById('execute-model');
const resultDiv = document.getElementById('result');

// Cargar el modelo al iniciar
async function loadModel() {
    try {
        console.log('Cargando modelo COCO-SSD...');
        model = await cocoSsd.load();
        console.log('Modelo cargado exitosamente');
    } catch (error) {
        console.error('Error al cargar el modelo:', error);
        alert('Error al cargar el modelo de detección. Por favor recarga la página.');
    }
}

// Inicializar la carga del modelo
loadModel();

// Manejar selección de archivo
fileInput.addEventListener('change', handleFileSelect);

// Drag and drop
uploadSection.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadSection.classList.add('dragover');
});

uploadSection.addEventListener('dragleave', () => {
    uploadSection.classList.remove('dragover');
});

uploadSection.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadSection.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        handleFile(files[0]);
    }
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    // Guardar el blob
    currentImageBlob = file;

    // Crear URL del blob para preview
    const blobUrl = URL.createObjectURL(file);

    // Mostrar preview
    imagePreview.src = blobUrl;
    imagePreviewContainer.classList.add('active');
    executeButton.classList.add('active');
    resultDiv.classList.remove('active');

    // Limpiar URL anterior si existe
    imagePreview.onload = () => {
        URL.revokeObjectURL(blobUrl);
    };
}

// Ejecutar detección
executeButton.addEventListener('click', async () => {
    if (!currentImageBlob) {
        alert('Por favor selecciona una imagen primero');
        return;
    }

    if (!model) {
        alert('El modelo aún se está cargando. Por favor espera un momento.');
        return;
    }

    // Deshabilitar botón y mostrar loading
    executeButton.disabled = true;
    resultDiv.innerHTML = '<div class="loading"><div class="spinner"></div>Analizando imagen...</div>';
    resultDiv.classList.add('active');

    try {
        // Realizar detección
        const predictions = await model.detect(imagePreview);

        // Filtrar solo personas (class: 'person')
        const persons = predictions.filter(pred => pred.class === 'person');
        const personCount = persons.length;

        // Mostrar resultados
        displayResults(personCount, persons);

    } catch (error) {
        console.error('Error en la detección:', error);
        resultDiv.innerHTML = '<div class="result-title">❌ Error</div><div class="result-content">Hubo un error al analizar la imagen.</div>';
    } finally {
        executeButton.disabled = false;
    }
});

function displayResults(count, persons) {
    let resultHTML = '<div class="result-title">📊 Resultado del Análisis</div>';

    if (count === 0) {
        resultHTML += '<div class="result-content">No se detectaron personas en la imagen.</div>';
        resultHTML += '<div class="person-count">0 personas</div>';
    } else {
        resultHTML += '<div class="result-content">Se detectaron personas en la imagen:</div>';
        resultHTML += `<div class="person-count">${count} persona${count > 1 ? 's' : ''}</div>`;

        // Mostrar detalles de confianza
        resultHTML += '<div class="detection-box">';
        resultHTML += '<strong>Detalles de detección:</strong><br>';
        persons.forEach((person, index) => {
            const confidence = (person.score * 100).toFixed(1);
            resultHTML += `Persona ${index + 1}: ${confidence}% de confianza<br>`;
        });
        resultHTML += '</div>';
    }

    resultDiv.innerHTML = resultHTML;
    resultDiv.classList.add('active');
}
