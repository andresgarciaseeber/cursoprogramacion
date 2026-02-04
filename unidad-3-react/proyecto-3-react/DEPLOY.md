# Guía de Despliegue a Producción - Proyecto 3 React

## Configuración Previa

### 1. Actualizar URL de Producción
Edita el archivo `.env.production` y cambia la URL del API:
```
VITE_API_URL=https://tu-dominio.com/proyectos-musicales
```

### 2. Verificar Backend
Asegúrate que tu backend PHP esté funcionando en producción:
- `api.php` debe estar accesible
- CORS configurado correctamente
- Base de datos MySQL conectada

## Comandos para Build

### Paso 1: Instalar dependencias (si es necesario)
```bash
cd c:\xampp\htdocs\cursodepc\unidad-3-react\proyecto-3-react
npm install
```

### Paso 2: Revisar código (opcional)
```bash
npm run lint
```

### Paso 3: Generar build de producción
```bash
npm run build
```
Esto creará la carpeta `dist/` con todos los archivos optimizados.

### Paso 4: Probar localmente el build
```bash
npm run preview
```
Abre http://localhost:4173 para verificar que todo funcione.

## Desplegar a Producción

### Opción A: XAMPP/Apache Local o Servidor

1. Copia el contenido de la carpeta `dist/` a tu directorio web:
```bash
xcopy /E /I dist\* c:\xampp\htdocs\proyectos-musicales-app\
```

2. El archivo `.htaccess` ya está incluido en `dist/` para manejar el routing de React.

3. Accede a: `http://localhost/proyectos-musicales-app/`

### Opción B: Netlify (Gratis)

1. Crea cuenta en https://netlify.com
2. Arrastra la carpeta `dist/` al dashboard de Netlify
3. Tu app estará en línea en segundos

### Opción C: Vercel (Gratis)

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Despliega:
```bash
vercel --prod
```

## Estructura de Archivos de Producción

Después del build, la carpeta `dist/` contendrá:
```
dist/
├── index.html                      # HTML principal
├── .htaccess                       # Configuración Apache
├── assets/
│   ├── index-[hash].js            # JavaScript optimizado
│   ├── index-[hash].css           # CSS minificado
│   └── [otros assets]
└── vite.svg                        # Favicon
```

## Checklist Pre-Producción

- [ ] Backend PHP funcionando en servidor
- [ ] Base de datos MySQL migrada
- [ ] CORS configurado en `api.php`
- [ ] `.env.production` con URL correcta
- [ ] `npm run build` ejecutado sin errores
- [ ] `npm run preview` testeado
- [ ] Archivos de `dist/` copiados al servidor

## Solución de Problemas

### Error 404 en rutas
- Verifica que `.htaccess` esté en la raíz de tu app
- Asegúrate que `mod_rewrite` esté habilitado en Apache

### API no responde
- Verifica la URL en `.env.production`
- Revisa CORS en `api.php`
- Abre la consola del navegador para ver errores

### Página en blanco
- Revisa la consola del navegador (F12)
- Verifica que los assets se carguen correctamente
- Puede ser un problema de rutas base en `vite.config.js`

## Contacto
Para más información sobre el proyecto, consulta:
- `README.md` - Información general
- `README_EVALUACION.md` - Sistema de evaluación
- `API_SETUP.md` - Configuración de APIs sociales
