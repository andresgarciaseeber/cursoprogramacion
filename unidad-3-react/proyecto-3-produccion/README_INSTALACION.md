# 🚀 Sistema de Evaluación de Proyectos Musicales - PRODUCCIÓN

## ✅ Archivos Listos para FTP

Esta carpeta contiene todos los archivos optimizados y listos para subir a tu servidor.

## 📦 Contenido de la Carpeta

```
proyecto-3-produccion/
├── index.html              # Página principal
├── .htaccess              # Configuración Apache (IMPORTANTE)
├── vite.svg               # Favicon
├── assets/
│   ├── index-BPQlVV4l.js    # JavaScript optimizado (651 KB)
│   └── index-UBojdTtc.css   # CSS minificado (17.85 KB)
├── LEEME_FTP.txt          # Instrucciones básicas
└── README_INSTALACION.md  # Este archivo
```

## 📤 Instrucciones de Subida por FTP

### Paso 1: Conectar al Servidor FTP
```
Host: ftp.tu-servidor.com
Usuario: tu-usuario
Contraseña: tu-contraseña
Puerto: 21 (o 22 para SFTP)
```

### Paso 2: Crear Carpeta en el Servidor
- Crea una carpeta en `/public_html/` o `/www/`
- Nombre sugerido: `evaluacion-proyectos`

### Paso 3: Subir Archivos
**IMPORTANTE:** Sube TODO el contenido de esta carpeta, incluyendo:
- ✅ index.html
- ✅ .htaccess (archivo oculto, muy importante)
- ✅ vite.svg
- ✅ Carpeta `assets/` completa con sus archivos

### Paso 4: Configurar Permisos
```
Carpetas: 755 (drwxr-xr-x)
Archivos: 644 (-rw-r--r--)
.htaccess: 644 (-rw-r--r--)
```

## 🔧 Requisitos del Servidor

### Backend PHP
El backend debe estar accesible en:
```
https://tu-dominio.com/proyectos-musicales/api.php
```

Si tu backend está en otra ubicación, debes:
1. Editar `.env.production` en el proyecto original
2. Cambiar `VITE_API_URL` con la nueva URL
3. Ejecutar `npm run build` nuevamente
4. Subir los nuevos archivos

### Servidor Web
- Apache con mod_rewrite habilitado
- PHP 7.4 o superior
- MySQL 5.7 o superior

### Base de Datos
Ejecuta este SQL para actualizar las vistas:
```sql
DROP VIEW IF EXISTS ranking_proyectos;

CREATE OR REPLACE VIEW ranking_proyectos AS
SELECT
    pm.id,
    pm.nombre,
    pm.proyecto_musical,
    pm.destino,
    pm.rubros,
    pm.genero_musical,
    pm.ciudad,
    pm.provincia,
    pm.link_audio,
    pm.link_audio2,
    COALESCE(AVG(e.puntaje * ce.peso), 0) as puntaje_base,
    COALESCE(pm.otras_convocatorias, 0) as veces_presentado,
    COALESCE(pm.solicitudes_otorgadas, 0) as veces_ganador,
    (COALESCE(pm.otras_convocatorias, 0) * 0.20) - (COALESCE(pm.solicitudes_otorgadas, 0) * 2.0) as ajuste_historial,
    COALESCE(AVG(e.puntaje * ce.peso), 0) +
    (COALESCE(pm.otras_convocatorias, 0) * 0.20) - (COALESCE(pm.solicitudes_otorgadas, 0) * 2.0) as puntaje_final,
    COUNT(e.id) as criterios_evaluados,
    (SELECT COUNT(*) FROM criterios_evaluacion WHERE activo = 1) as total_criterios,
    CASE
        WHEN COUNT(e.id) = (SELECT COUNT(*) FROM criterios_evaluacion WHERE activo = 1)
        THEN 'Completo'
        ELSE 'Pendiente'
    END as estado_evaluacion
FROM proyectos_musicales pm
LEFT JOIN evaluaciones e ON pm.id = e.proyecto_id
LEFT JOIN criterios_evaluacion ce ON e.criterio_id = ce.id AND ce.activo = 1
GROUP BY pm.id
ORDER BY puntaje_final DESC, pm.nombre;
```

## 🌐 Acceder a la Aplicación

Después de subir los archivos:
```
https://tu-dominio.com/evaluacion-proyectos/
```

## 🔍 Verificación Post-Instalación

### 1. Verificar que la app carga
- Abre la URL en el navegador
- Deberías ver la interfaz de evaluación

### 2. Verificar conexión con API
- Abre la consola del navegador (F12)
- Ve a la pestaña "Network"
- Busca llamadas a `api.php`
- Verifica que respondan con código 200

### 3. Probar funcionalidades
- ✅ Lista de proyectos se carga
- ✅ Ranking se muestra correctamente
- ✅ Evaluaciones se pueden guardar
- ✅ Navegación entre páginas funciona

## ❌ Solución de Problemas

### Error 404 en rutas internas
**Problema:** Al navegar a `/ranking` o `/evaluacion` aparece 404

**Solución:**
1. Verifica que `.htaccess` esté presente
2. Verifica que `mod_rewrite` esté habilitado
3. Si usas subdirectorio, actualiza `RewriteBase` en `.htaccess`:
   ```apache
   RewriteBase /evaluacion-proyectos/
   ```

### API no responde (CORS errors)
**Problema:** Error de CORS en la consola

**Solución:**
Verifica que `api.php` tenga estos headers:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

### Página en blanco
**Problema:** La página carga pero está en blanco

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que los archivos en `/assets/` se carguen correctamente
4. Si hay error 404 en assets, puede ser problema de rutas base

### Assets no cargan (404 en CSS/JS)
**Problema:** index.html carga pero CSS y JS dan 404

**Solución:**
Si tu app está en un subdirectorio, debes reconstruir con:
```javascript
// vite.config.js
export default defineConfig({
  base: '/evaluacion-proyectos/',  // Agregar esta línea
  plugins: [react()],
})
```
Luego ejecutar `npm run build` nuevamente.

## 📊 Características del Build

- **Tamaño total:** ~670 KB
- **JavaScript minificado:** 651 KB (191 KB gzipped)
- **CSS minificado:** 17.85 KB (4.14 KB gzipped)
- **Optimización:** Código muerto eliminado (tree-shaking)
- **Compatibilidad:** Navegadores modernos

## 🔐 Seguridad

- ✅ Código minificado y ofuscado
- ✅ Sin variables de entorno expuestas
- ✅ HTTPS recomendado para producción
- ✅ Backend con validación de entrada

## 📞 Soporte

Para más información técnica, consulta:
- `DEPLOY.md` en el proyecto original
- `API_SETUP.md` para configuración de APIs sociales
- `README_EVALUACION.md` para detalles del sistema

---

**Fecha de build:** 2025-12-04
**Versión React:** 19.2.0
**Bundler:** Vite 7.2.4
