# Sistema de Evaluación de Proyectos Musicales - ENACOM

Sistema completo de evaluación de proyectos musicales desarrollado en React con análisis de imágenes mediante TensorFlow.js.

## 🎯 Características

### ✅ Funcionalidades Implementadas

1. **Gestión de Proyectos**
   - Lista completa de proyectos musicales
   - Filtros por nombre, destino y rubros
   - Vista de antecedentes artísticos
   - Información detallada de cada proyecto

2. **Sistema de Evaluación**
   - 7 criterios de evaluación con pesos personalizados
   - Interfaz intuitiva con puntuaciones de 1 a 10
   - Guardado automático de evaluaciones
   - Visualización de evaluaciones existentes

3. **Criterios de Evaluación**
   - Calidad Artística (peso 1.2x)
   - Viabilidad Técnica (peso 1.0x)
   - Impacto Cultural (peso 1.1x)
   - Innovación (peso 1.0x)
   - Antecedentes (peso 0.9x)
   - Producción (peso 1.0x)
   - **Federalismo** (peso 1.15x) - Prioriza proyectos fuera del AMBA

4. **Ranking Inteligente**
   - Puntaje base calculado con pesos de criterios
   - Ajuste por historial de participaciones:
     - ⭐ **Bonus +0.8**: Proyectos que se presentaron 3+ veces sin ganar
     - ⭐ **Bonus +0.5**: Proyectos que se presentaron 2 veces sin ganar
     - ⚠️ **Penalización -0.5**: Proyectos que ya ganaron anteriormente
   - Indicador de federalismo (dentro/fuera AMBA)
   - Estado de evaluación completo

5. **Análisis con TensorFlow.js** 🤖
   - Detección de personas en imágenes de eventos
   - Conteo automático de audiencia
   - Clasificación de nivel de audiencia:
     - Pequeño (< 10 personas)
     - Moderado (10-29 personas)
     - Grande (30-49 personas)
     - Masivo (50+ personas)
   - Visualización de detecciones en canvas
   - Detección de otros elementos en la escena

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js 16+ instalado
- XAMPP con MySQL y Apache corriendo
- Base de datos `proyectos` configurada

### Paso 1: Configurar la Base de Datos

1. Asegúrate de que XAMPP esté corriendo
2. Abre phpMyAdmin: `http://localhost/phpmyadmin`
3. Selecciona la base de datos `proyectos`
4. Ejecuta el archivo SQL:
   ```sql
   -- Ubicación: c:\xampp\htdocs\proyectos-musicales\database_evaluacion.sql
   ```
5. Verifica que se crearon las tablas:
   - `criterios_evaluacion`
   - `evaluadores`
   - `evaluaciones`
   - `historial_participaciones`
   - Vistas: `ranking_proyectos`, `vista_evaluadores`, `vista_proyectos_con_antecedentes`

### Paso 2: Verificar el Backend PHP

El backend ya está configurado en:
```
c:\xampp\htdocs\proyectos-musicales\
```

Verifica que el API funcione visitando:
- `http://localhost/proyectos-musicales/api.php?action=proyectos`
- `http://localhost/proyectos-musicales/api.php?action=criterios`

### Paso 3: Instalar Dependencias React

```bash
cd c:\xampp\htdocs\cursodepc\unidad-3-react\proyecto-3-react
npm install
```

Las dependencias ya instaladas incluyen:
- `react` y `react-dom`
- `axios` - Para consumir el API PHP
- `@tensorflow/tfjs` - TensorFlow.js
- `@tensorflow-models/coco-ssd` - Modelo de detección de objetos

### Paso 4: Iniciar la Aplicación

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## 📁 Estructura del Proyecto

```
proyecto-3-react/
├── src/
│   ├── Components/
│   │   ├── ProjectList.jsx          # Lista de proyectos
│   │   ├── ProjectList.css
│   │   ├── EvaluationForm.jsx       # Formulario de evaluación
│   │   ├── EvaluationForm.css
│   │   ├── Ranking.jsx              # Tabla de ranking
│   │   ├── Ranking.css
│   │   ├── ImageAnalyzer.jsx        # Análisis de imágenes IA
│   │   └── ImageAnalyzer.css
│   ├── services/
│   │   ├── api.js                   # Servicio API (axios)
│   │   └── imageAnalysis.js         # Servicio TensorFlow.js
│   ├── App.jsx                      # Componente principal
│   ├── App.css
│   └── main.jsx
├── index.html
└── package.json
```

## 🎨 Uso del Sistema

### 1. Evaluación de Proyectos

1. **Seleccionar un proyecto** de la lista lateral
2. Ver los **detalles completos** incluyendo antecedentes artísticos
3. **Puntuar cada criterio** del 1 al 10
4. Las evaluaciones se **guardan automáticamente**

### 2. Análisis de Audiencia con IA

1. En la página de evaluación, desplázate hacia abajo
2. Haz clic en **"Seleccionar Imagen"**
3. Sube una foto del evento musical
4. Haz clic en **"Analizar Audiencia"**
5. Espera mientras TensorFlow.js analiza la imagen
6. Observa los resultados:
   - Cantidad de personas detectadas
   - Nivel de audiencia
   - Visualización de detecciones
   - Otros elementos detectados (instrumentos, equipos, etc.)

### 3. Ver el Ranking

1. Haz clic en el botón **"Ranking"** en la navegación
2. Observa la tabla con:
   - Posición en el ranking
   - Puntajes base y ajustados
   - Indicadores de federalismo
   - Historial de participaciones
3. Filtra por cantidad de proyectos (Top 10, 25, 50, 100)

## 🔧 Configuración del API

Si necesitas cambiar la URL del backend, edita:

```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost/proyectos-musicales/api.php';
```

## 🎯 Criterios Especiales Implementados

### Federalismo
El sistema detecta automáticamente si un proyecto está fuera del AMBA usando:
- Provincias fuera de Buenos Aires, CABA
- Ciudades de Buenos Aires no incluidas en el conurbano

### Historial de Participaciones
- Se puede registrar cuántas veces un artista se presentó
- Se puede marcar si ganó en años anteriores
- El sistema ajusta automáticamente el puntaje final

## 🤖 TensorFlow.js - Análisis de Imágenes

El sistema utiliza el modelo **COCO-SSD** para detectar:
- ✅ Personas (para contar audiencia)
- ✅ Instrumentos musicales
- ✅ Equipos de sonido
- ✅ Otros objetos relevantes

### Niveles de Audiencia

| Personas | Nivel | Color | Score |
|----------|-------|-------|-------|
| 0 | Sin datos | Gris | 0 |
| 1-9 | Pequeño | Naranja | 1 |
| 10-29 | Moderado | Azul | 2 |
| 30-49 | Grande | Verde | 3 |
| 50+ | Masivo | Rojo | 4 |

## 📊 Datos de Ejemplo

Para probar el sistema, puedes:

1. **Agregar proyectos de prueba** en phpMyAdmin
2. **Agregar historial de participaciones**:
   ```sql
   INSERT INTO historial_participaciones (proyecto_id, anio, gano) VALUES
   (1, 2023, 0),
   (1, 2022, 0),
   (1, 2021, 0);
   ```
3. **Cargar imágenes de prueba** para el análisis de audiencia

## 🐛 Solución de Problemas

### Error de conexión al API
- Verifica que XAMPP esté corriendo
- Verifica que el archivo `api.php` exista en `c:\xampp\htdocs\proyectos-musicales\`
- Verifica la consola del navegador para errores CORS

### TensorFlow.js no carga
- Asegúrate de tener conexión a internet (descarga el modelo)
- Revisa la consola para errores de carga del modelo
- Primera carga puede tardar ~30 segundos

### Las evaluaciones no se guardan
- Verifica que las tablas existan en la base de datos
- Ejecuta `c:\xampp\htdocs\proyectos-musicales\verificar_tablas.php`
- Revisa la consola del navegador

## 🎓 Tecnologías Utilizadas

- **Frontend**: React 19.2
- **Backend**: PHP + MySQL
- **IA**: TensorFlow.js + COCO-SSD
- **HTTP Client**: Axios
- **Estilos**: CSS3 (Grid, Flexbox, Animations)
- **Iconos**: Font Awesome 6.4
- **Build Tool**: Vite

## 📝 Notas Importantes

- ⚠️ El análisis de imágenes requiere conexión a internet la primera vez (descarga del modelo)
- 📸 Para mejores resultados, usa imágenes claras con buena iluminación
- 🎯 El conteo de personas es aproximado y depende de la calidad de la imagen
- 💾 Todas las evaluaciones se guardan en tiempo real en MySQL

## 🚀 Próximas Mejoras Sugeridas

- [ ] Análisis de presencia en redes sociales
- [ ] Integración con APIs de Spotify/YouTube para metrics
- [ ] Dashboard con gráficos y estadísticas
- [ ] Export de rankings a PDF/Excel
- [ ] Sistema de login para evaluadores
- [ ] Notificaciones en tiempo real

---

**Desarrollado con ❤️ para ENACOM - Instituto Nacional de la Música**
