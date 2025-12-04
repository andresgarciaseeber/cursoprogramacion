# 🔑 Configuración de APIs para Métricas de Redes Sociales

Esta guía te ayudará a obtener las claves de API necesarias para acceder a métricas completas de redes sociales y plataformas musicales.

---

## 📊 Estado Actual del Sistema

### ✅ **Funcionando SIN API Keys** (Información Pública)
- **YouTube**: Título, autor, thumbnail (vía oEmbed API)
- **SoundCloud**: Título, autor, thumbnail, descripción (vía oEmbed API)
- **Detección de plataforma**: YouTube, Spotify, SoundCloud, Instagram, Bandcamp, Apple Music, Deezer
- **Score de presencia digital**: Calculado automáticamente

### 🔒 **Requiere API Keys** (Métricas Detalladas)
- **Spotify**: Oyentes mensuales, popularidad del artista, seguidores
- **YouTube**: Vistas del video, likes, dislikes, suscriptores del canal
- **Instagram**: Seguidores, engagement, likes, comentarios
- **SoundCloud**: Reproducciones, favoritos, comentarios (API privada)

---

## 🎵 Spotify Web API

### Métricas Disponibles:
- ✅ Oyentes mensuales del artista
- ✅ Popularidad del artista (0-100)
- ✅ Géneros del artista
- ✅ Número de seguidores
- ✅ Top tracks del artista
- ✅ Álbumes y singles

### Cómo Obtener API Keys:

1. **Crear Cuenta en Spotify for Developers**
   - Ve a: https://developer.spotify.com/dashboard
   - Inicia sesión con tu cuenta de Spotify (o crea una gratis)

2. **Crear una App**
   - Click en "Create an App"
   - Nombre: "ENACOM Music Evaluation System"
   - Descripción: "Sistema de evaluación de proyectos musicales"
   - Acepta los términos

3. **Obtener Credenciales**
   - Una vez creada la app, verás:
     - **Client ID**: `tu_client_id_aqui`
     - **Client Secret**: `tu_client_secret_aqui` (Click en "Show Client Secret")

4. **Configurar en el Proyecto**
   ```javascript
   // src/config/apiKeys.js
   export const SPOTIFY_CONFIG = {
     clientId: 'TU_CLIENT_ID',
     clientSecret: 'TU_CLIENT_SECRET'
   };
   ```

5. **Ejemplo de Uso** (obtener oyentes mensuales):
   ```javascript
   // Primero obtener token de acceso
   const getSpotifyToken = async () => {
     const response = await fetch('https://accounts.spotify.com/api/token', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
       },
       body: 'grant_type=client_credentials'
     });
     return (await response.json()).access_token;
   };

   // Luego obtener datos del artista
   const getArtistData = async (artistId, token) => {
     const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
       headers: { 'Authorization': `Bearer ${token}` }
     });
     const data = await response.json();
     return {
       monthlyListeners: data.followers.total, // Aproximado
       popularity: data.popularity,
       followers: data.followers.total
     };
   };
   ```

### Limitaciones:
- **Límite de requests**: 100 requests por segundo
- **Gratis**: Sí, totalmente gratuito
- **Oyentes mensuales**: No directamente en API, se aproxima con followers

---

## 📹 YouTube Data API v3

### Métricas Disponibles:
- ✅ Vistas del video
- ✅ Likes y dislikes
- ✅ Comentarios
- ✅ Suscriptores del canal
- ✅ Fecha de publicación
- ✅ Duración del video

### Cómo Obtener API Key:

1. **Google Cloud Console**
   - Ve a: https://console.cloud.google.com
   - Inicia sesión con tu cuenta de Google

2. **Crear Proyecto**
   - Click en el selector de proyectos (arriba)
   - "Nuevo Proyecto"
   - Nombre: "ENACOM Music Evaluation"
   - Click en "Crear"

3. **Habilitar YouTube Data API v3**
   - En el menú, ve a "APIs y servicios" > "Biblioteca"
   - Busca "YouTube Data API v3"
   - Click en "Habilitar"

4. **Crear Credenciales**
   - Ve a "APIs y servicios" > "Credenciales"
   - Click en "Crear credenciales" > "Clave de API"
   - Copia la clave generada

5. **Restringir la API Key** (Recomendado)
   - Click en la clave creada
   - En "Restricciones de API", selecciona "Restringir clave"
   - Marca solo "YouTube Data API v3"
   - Guarda

6. **Configurar en el Proyecto**
   ```javascript
   // src/config/apiKeys.js
   export const YOUTUBE_API_KEY = 'TU_API_KEY_AQUI';
   ```

7. **Ejemplo de Uso**:
   ```javascript
   const getYouTubeStats = async (videoId) => {
     const response = await fetch(
       `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
     );
     const data = await response.json();
     const video = data.items[0];

     return {
       views: video.statistics.viewCount,
       likes: video.statistics.likeCount,
       comments: video.statistics.commentCount,
       title: video.snippet.title,
       channelTitle: video.snippet.channelTitle
     };
   };
   ```

### Limitaciones:
- **Cuota diaria**: 10,000 unidades por día (GRATIS)
- **Costo por request**: 1-100 unidades dependiendo de la operación
- **Consultas de video**: ~1 unidad (puedes hacer ~10,000 por día)

---

## 📸 Instagram Graph API

### Métricas Disponibles:
- ✅ Seguidores
- ✅ Número de publicaciones
- ✅ Engagement rate
- ✅ Likes por post
- ✅ Comentarios

### Cómo Obtener Acceso:

1. **Crear Cuenta de Facebook for Developers**
   - Ve a: https://developers.facebook.com
   - Inicia sesión con tu cuenta de Facebook

2. **Crear App**
   - Click en "Mis Apps" > "Crear App"
   - Tipo: "Negocio"
   - Nombre: "ENACOM Music Stats"

3. **Agregar Instagram Graph API**
   - En el panel de la app, busca "Instagram Graph API"
   - Click en "Configurar"

4. **Obtener Token de Acceso**
   - Ve a "Herramientas" > "Graph API Explorer"
   - Selecciona tu app
   - Genera un token de acceso de usuario

5. **IMPORTANTE**:
   - Requiere cuenta de Instagram Business o Creator
   - La cuenta debe estar conectada a una página de Facebook
   - Proceso más complejo que otras APIs

### Limitaciones:
- **Requiere**: Cuenta de Instagram Business/Creator
- **Requiere**: Página de Facebook vinculada
- **Límite de requests**: 200 llamadas por hora por usuario
- **Gratis**: Sí, pero con proceso de revisión para producción

---

## 🎧 SoundCloud API

### Estado: **API Privada desde 2021**

SoundCloud cerró su API pública. Alternativas:

1. **Web Scraping** (no recomendado, viola TOS)
2. **oEmbed API** (solo información básica - ya implementado)
3. **Servicios de terceros**:
   - RapidAPI SoundCloud API (de pago)
   - Contactar a SoundCloud para acceso empresarial

---

## 🔧 Implementación en el Proyecto

### Paso 1: Crear archivo de configuración

```javascript
// src/config/apiKeys.js
export const API_KEYS = {
  spotify: {
    clientId: 'TU_SPOTIFY_CLIENT_ID',
    clientSecret: 'TU_SPOTIFY_CLIENT_SECRET'
  },
  youtube: 'TU_YOUTUBE_API_KEY',
  instagram: {
    accessToken: 'TU_INSTAGRAM_ACCESS_TOKEN'
  }
};
```

### Paso 2: Actualizar el servicio socialMetrics.js

```javascript
import { API_KEYS } from '../config/apiKeys';

// Agregar métodos para cada API con las keys configuradas
```

### Paso 3: Variables de Entorno (Recomendado)

En lugar de hardcodear las keys, usa variables de entorno:

```bash
# .env.local
VITE_SPOTIFY_CLIENT_ID=tu_client_id
VITE_SPOTIFY_CLIENT_SECRET=tu_client_secret
VITE_YOUTUBE_API_KEY=tu_api_key
```

Luego en tu código:
```javascript
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
```

---

## 💡 Ejemplo Completo: Spotify + YouTube

Aquí te dejo un ejemplo funcional para obtener métricas de ambas plataformas:

```javascript
// src/services/fullSocialMetrics.js
class FullSocialMetricsService {
  async getSpotifyArtistStats(artistId) {
    // 1. Obtener token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
      },
      body: 'grant_type=client_credentials'
    });
    const { access_token } = await tokenResponse.json();

    // 2. Obtener datos del artista
    const artistResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      { headers: { 'Authorization': `Bearer ${access_token}` }}
    );
    const artist = await artistResponse.json();

    return {
      name: artist.name,
      followers: artist.followers.total,
      popularity: artist.popularity,
      genres: artist.genres
    };
  }

  async getYouTubeVideoStats(videoId) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${API_KEY}`
    );
    const { items } = await response.json();
    const video = items[0];

    return {
      title: video.snippet.title,
      views: parseInt(video.statistics.viewCount),
      likes: parseInt(video.statistics.likeCount),
      comments: parseInt(video.statistics.commentCount)
    };
  }
}
```

---

## 🚀 Prioridad de Implementación

Si tienes tiempo limitado, implementa en este orden:

1. **YouTube Data API** ⭐⭐⭐ (Más fácil, más útil)
   - Setup: 10 minutos
   - Métricas: Vistas, likes, suscriptores

2. **Spotify Web API** ⭐⭐ (Muy útil para música)
   - Setup: 15 minutos
   - Métricas: Oyentes, popularidad

3. **Instagram Graph API** ⭐ (Más complejo)
   - Setup: 30-60 minutos
   - Requiere cuenta Business

---

## ⚠️ Consideraciones de Seguridad

1. **NUNCA expongas las API keys en el código frontend**
2. **Usa variables de entorno**
3. **Considera crear un backend proxy**:
   ```
   Frontend → Tu Backend → API de Terceros
   ```
4. **Las keys en el frontend pueden ser extraídas**
5. **Para producción, implementa autenticación servidor-side**

---

## 📚 Documentación Oficial

- **Spotify**: https://developer.spotify.com/documentation/web-api
- **YouTube**: https://developers.google.com/youtube/v3
- **Instagram**: https://developers.facebook.com/docs/instagram-api
- **Facebook**: https://developers.facebook.com/docs/graph-api

---

**¿Necesitas ayuda implementando alguna API específica?**
Contáctame y te ayudo a integrarla paso a paso.
